import { React, Component } from "react";
import { Link } from "react-router-dom";
import WhiteDownArrow from "../assets/white drop-down-arrow.svg";
import DownArrow from "../assets/drop-down-arrow.svg";
import "./mainfitness.scss";
import activityIcon from "../assets/running.svg";
import waterGlass from "../assets/water-glass.svg";
import weekAct from "../assets/challenge.svg";
import Plus from "../assets/plus.svg";
import Minus from "../assets/negative.svg";
import axios from "axios";
import NavBar from "../navBar/navbar";

class MainFitnessPage extends Component {
  state = {
    authenticated: false,
    checkedforcontent: false,
    cupsDrank: 0,
    targetCups: 8,
    fitness: null,
    daysAndActivities: [
      {
        day: new Date(),
        activities: [
          {
            name: "running",
            description: "run",
            directions: "just run",
            variation: {
              name: "run",
              description: "run",
              indoor: true,
              outdoor: true,
            },
          },
        ],
      },
    ],
    weight: undefined,
    goalweight: undefined,
    watertracker: true,
  };

  componentDidMount() {
    let body = {
      username: this.props.match.params.username,
      userid: this.props.match.params.id,
    };
    axios.post("http://localhost:7500/auth/authenticate", body).then((res) => {
      this.setState({
        authenticated: res.data,
        user: this.props.match.params.username,
      });
      console.log(res.data);
    });
  }
  componentDidUpdate() {
    if (this.state.authenticated && !this.state.checkedforcontent) {
      let body = {
        username: this.props.match.params.username,
        userid: this.props.match.params.id,
      };

      axios
        .post("http://localhost:7500/auth/services", body)
        .then((res) => {
          this.setState({ fitness: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
      this.setState({ checkedforcontent: true });
    }
  }
  todaysActivities = () => {
    let today = new Date();
    let displayday = this.state.fitness.activitiesAndDays.find(
      (date) =>
        new Date(date.day).toLocaleDateString() === today.toLocaleDateString()
    );
    console.log(displayday);
    if (displayday) {
      return displayday;
    } else {
      displayday = {
        day: new Date(),
        activities: [
          {
            name: "running",
            description: "run",
            directions: "just run",
            variation: {
              name: "run",
              description: "run",
              indoor: true,
              outdoor: true,
            },
          },
        ],
      };
    }
  };

  render() {
    let todaysActivities;
    if (this.state.fitness) {
      todaysActivities = this.todaysActivities();
      console.log(todaysActivities);
    }
    console.log(this.state.fitness);
    const options = { weekday: "long", month: "long", day: "numeric" };
    if (this.state.authenticated) {
      return (
        <div className="body">
          <NavBar
            username={this.props.match.params.username}
            userid={this.props.match.params.id}
          />
          <div className="mainfitness">
            <div className="mainfitness__line1">
              <div className="activities">
                <div className="activities__line1">
                  <h3 className="activities__header">Todays Activities</h3>
                  <img
                    className="activities__image"
                    src={activityIcon}
                    alt="icon"
                  />
                </div>
                <div className="excercises">
                  {todaysActivities
                    ? todaysActivities.activities.map((activity) => {
                        return (
                          <div className="excercises__box">
                            <div className="excercises__box-line1">
                              <h4 className="excercises__box-header">
                                {activity.name.toUpperCase()} :{" "}
                                {activity.variation.name}{" "}
                              </h4>

                              <img
                                className={`excercises__box-image${
                                  this.state[`view${activity.name}`]
                                }`}
                                src={DownArrow}
                                onClick={() =>
                                  this.setState({
                                    [`view${activity.name}`]: !this.state[
                                      `view${activity.name}`
                                    ],
                                  })
                                }
                              ></img>
                            </div>
                            {this.state[`view${activity.name}`] ? (
                              <div className="excercises__box-info">
                                <p className="excercise__box-item">
                                  <span className="bold">Description: </span>
                                  {activity.variation.description}
                                </p>
                                {activity.variation.outdoor &&
                                activity.variation.indoor ? (
                                  <p className="excercise__box-item">
                                    <span classNamr="bold">
                                      Indoor/Outdoor: Both
                                    </span>
                                  </p>
                                ) : null}
                                {activity.variation.outdoor &&
                                !activity.variation.indoor ? (
                                  <p className="excercise__box-item">
                                    Indoor/Outdoor: Outdoor
                                  </p>
                                ) : null}
                                {!activity.variation.outdoor &&
                                activity.variation.indoor ? (
                                  <p className="excercise__box-item">
                                    Indoor/Outdoor: Indoor
                                  </p>
                                ) : null}
                                <p className="excercise__box-item">
                                  Directions:{activity.directions}{" "}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
              {this.state.watertracker ? (
                <div className="water">
                  <div className="water__line1">
                    <h3 className="water__header">
                      You drank {this.state.cupsDrank} cups of water today!
                    </h3>
                    <img
                      className="water__image"
                      src={waterGlass}
                      alt="waterglass"
                    ></img>
                  </div>
                  <p className="water__description">
                    It's recomended that the average adult drink 8 cups of water
                    each day. Your goal for today is {this.state.targetCups}{" "}
                    cups! (1 cup is aprox. 250 ml)
                  </p>
                  {this.state.cupsDrank >= this.state.targetCups ? (
                    <p className="water__description">
                      Nice! you hit your water intake goal for today!
                    </p>
                  ) : null}
                  <div className="water__icons">
                    <img
                      className="water__icons-icon"
                      src={Minus}
                      alt="-"
                      onClick={() =>
                        this.setState({ cupsDrank: this.state.cupsDrank - 1 })
                      }
                    />
                    <img
                      className="water__icons-icon"
                      src={Plus}
                      alt="+"
                      onClick={() =>
                        this.setState({ cupsDrank: this.state.cupsDrank + 1 })
                      }
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="week">
              <div className="week__line1">
                <img className="week__image" src={weekAct}></img>
                <h3 className="week__Header">Activities for this week</h3>
                <img
                  className={`week__image${this.state["activities"]}`}
                  src={WhiteDownArrow}
                  onClick={() =>
                    this.setState({ ["activities"]: !this.state["activities"] })
                  }
                />
              </div>
              {this.state["activities"] ? (
                <div className="weekActivities">
                  {this.state.fitness.activitiesAndDays.map((day) => {
                    return (
                      <div className="weekActivities__box">
                        <div className="weekActivities__line1">
                          <h4 className="weekActivities__day">
                            {new Date(day.day).toLocaleDateString(
                              undefined,
                              options
                            )}
                          </h4>
                          <img
                            className={`weekActivities__image${
                              this.state[`${day.day}active`]
                            }`}
                            src={DownArrow}
                            onClick={() =>
                              this.setState({
                                [`${day.day}active`]: !this.state[
                                  `${day.day}active`
                                ],
                              })
                            }
                          />
                        </div>

                        {day.activities && day.activities !== [] ? (
                          <div>
                            {this.state[`${day.day}active`] ? (
                              <div className="weekActivities__list">
                                {day.activities.map((act) => {
                                  return (
                                    <div className="activitybox">
                                      <p className="activitybox__name">
                                        {act.variation.name.toUpperCase()}
                                      </p>
                                      {console.log(act)}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        ) : (
                          <p className="weekActivities__none">
                            No activities this day
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="noauth__header">Not Logged in</h1>
          <Link to="/">
            <button type="noauth__button" className>
              Login
            </button>
          </Link>
        </div>
      );
    }
  }
}

export default MainFitnessPage;
