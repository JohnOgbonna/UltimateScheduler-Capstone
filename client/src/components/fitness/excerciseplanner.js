import { React, Component } from "react";
import Dropdown from "../../components/assets/drop-down-arrow.svg";
import WhiteDropdown from "../../components/assets/white drop-down-arrow.svg";
import axios from "axios";
import "./excerciseplanner.scss";

class ExcercisePlanner extends Component {
  state = {
    cardioExcercises: [],
    muscleExcercises: [],
    fitness: {
      height: 0,
      weight: 0,
      goalweight: 0,
      activitiesAndDays: [],
    },
  };

  // {
  //         day:0,
  //         activities: [
  //             {
  //                 name: "",
  //                 description: "",
  //                 directions: "",
  //                 variation: [
  //                     {
  //                         name: "",
  //                         description: "",
  //                         indoor: "",
  //                         outdoor: ""
  //                     }
  //                 ]
  //             }
  //         ]
  //     }
  ArrayofDays = () => {
    //generates days of the week
    // var nextWeek = new Date().getTime() + weekInMilliseconds;

    let days = [];
    for (let i = 0; i <= 6; i++) {
      let day = new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000);
      days.push(day);
    }
    return days;
  }; 
  findtruthy = (object) =>{ 
    if(object){ 
      return true
    } 
    else{ 
      return false
    }
  }

  updateFitness = (day, activity, variation) => {
    let activitiesandDays = this.state.fitness.activitiesAndDays;
    console.log(day.getDay());

    let dayexists = activitiesandDays.find(
      (date) => date.day.toLocaleDateString() === day.toLocaleDateString()
    );
    if (dayexists) {
      let appendtoDay = dayexists;
      appendtoDay.activities.push({
        name: activity.name,
        description: activity.description,
        directions: activity.directions,
        variation: {
          name: variation.name,
          description: variation.description,
          indoor: variation.indoor,
          outdoor: variation.outdoor,
        },
      });
      activitiesandDays[activitiesandDays.indexOf(dayexists)] = appendtoDay; 
      this.setState({[`${appendtoDay.day.toLocaleDateString()}-${variation.name}`]: !this.state[`${appendtoDay.day.toLocaleDateString()}-${variation.name}`]})
    } else {
      activitiesandDays.push({
        day: day,
        activities: [
          {
            name: activity.name,
            description: activity.description,
            directions: activity.directions,
            variation: {
              name: variation.name,
              description: variation.description,
              indoor: variation.indoor,
              outdoor: variation.outdoor,
            },
          },
        ],
      }); 
      this.setState({[`${day.toLocaleDateString()}-${variation.name}`]: !this.state[`${day.toLocaleDateString()}-${variation.name}`]})

      if (activitiesandDays.length > 1) {
        activitiesandDays = activitiesandDays.sort(
          (a, b) => a.day.getTime() < b.day.getTime()
        );
      }
    }
    this.setState({
      fitness: {
        height: this.state.fitness.height,
        weight: this.state.fitness.weight,
        goalweight: this.state.fitness.goalweight,
        activitiesAndDays: activitiesandDays,
      },
    });
    console.log(this.state.fitness.activitiesAndDays);
  };
  componentDidMount() {
    if (this.props.match.params.gym === "on") {
      axios
        .get(`http://localhost:7500/cardio/`)
        .then((res) => {
          console.log(res.data);
          this.setState({ cardioExcercises: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(`http://localhost:7500/cardio/nogym`)
        .then((res) => {
          console.log(res.data);
          this.setState({ cardioExcercises: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } 
  registerActivities = () =>{ 
      let body = {
          userid: this.props.match.params.id, 
          fitness: this.state.fitness

       }
      axios.put("http://localhost:7500/auth/registerfitness", body )
      .then(res=>{ 
          console.log(res) 
          window.location.href= `/fitness/${this.props.match.params.username}/${this.props.match.params.id}`
      }) 
      .catch(err=>{ 
          console.log(err) 
          alert('Error! could not set up program')
      })
  }

  render() {
    // var weekInMilliseconds = 6 * 24 * 60 * 60 * 1000;
    // var nextWeek = new Date().getTime() + weekInMilliseconds;
    const options = { weekday: "long", month: "long", day: "numeric" };
    return (
      <div className="planner">
      <h1 className = "planner__header">Excercise Planner</h1>
        {this.props.match.params.weight === "true" ? (
          <div className="plansection">
            <h2 className="plansection__header">
              {" "}
              In addition to a healthy diet, cardio focused workouts are a great
              way to lose weight. Let's begin by keeping track of wich
              excercises you'd like to do throughout this week. Here are some
              suggestions:
            </h2>

            {this.state.fitness.activitiesAndDays !== [] ? (
              <div className="selected">
                <h2 className="selected__header">Selected Activities: </h2>

                {this.state.fitness.activitiesAndDays.map((day) => {
                  return ( 
                    <div className = "lists">
                    <div className="listSelect">
                      <h3 className="listSelect__day">
                        {day.day.toLocaleDateString(undefined, options)}
                      </h3>
                      <h4 className="listSelect__activities">Activities: </h4>
                      {day.activities.map((activity) => {
                        console.log(activity);
                        return (
                          <p className="listSelect__activity">
                            {activity.variation.name}
                          </p>
                        );
                      })}
                    </div>
                    </div>
                  );
                })}
                <button className="listSelect__button" onClick ={this.registerActivities}>Next Step</button>
              </div>
            ) : null}

            {this.ArrayofDays().map((day, index) => {
              return (
                <div
                  className={`plansection__daybox${this.state[`day${index}`]}`}
                >
                  <div className="plansection__daybox-line1">
                    <h3 className="plansection__daybox-header">
                      {day.toLocaleDateString(undefined, options)}
                    </h3>
                    <img
                      className={`plansection__image${
                        this.state[`day${index}`]
                      }`}
                      src={WhiteDropdown}
                      onClick={() => {
                        this.setState({
                          [`day${index}`]: !this.state[`day${index}`],
                        });
                      }}
                    />
                  </div>
                  {this.state[`day${index}`] ? (
                    <div className="plansection__listbox">
                      <h4 className="plansection__listbox-header">
                        Cardio excercises:
                      </h4>
                      {this.state.cardioExcercises.map((excercise) => {
                        return (
                          //create and setstate so onclick can have a state link
                          <div
                            className="listbox"
                            onClick={() => {
                              this.setState({
                                [`ex${excercise.id}`]: !this.state[
                                  `ex${excercise.id}`
                                ],
                              });
                            }}
                          >
                            <div className="listbox__line1">
                              <h5 className="listbox__header">
                                {excercise.name.toUpperCase()}:
                              </h5>

                              {/* //giving select button an onclick that sets state to allow a dropdown to select excercise variation */}
                              <button
                                className="listbox__button"
                                type="button"
                                onClick={() =>
                                  this.setState({
                                    [`select${excercise.id}`]: !this.state[
                                      `select${excercise.id}`
                                    ],
                                  })
                                }
                              >
                                Variations
                              </button>
                            </div>
                            {this.state[`select${excercise.id}`] ? (
                              <div className="listbox__variations">
                                <h5 className="variationbox__select">
                                  Select Variation
                                </h5>
                                {excercise.variations.map((variation) => {
                                  return (
                                    <div
                                      className={`variationbox${this.state[`${day.toLocaleDateString()}-${variation.name}`]}`}
                                      onClick={() =>
                                        this.updateFitness(
                                          day,
                                          excercise,
                                          variation
                                        )
                                      }
                                    >
                                      <h5 className="variationbox__header">
                                        {variation.name}
                                      </h5>
                                      <p className="variationbox__description">
                                        {variation.description}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
export default ExcercisePlanner;
