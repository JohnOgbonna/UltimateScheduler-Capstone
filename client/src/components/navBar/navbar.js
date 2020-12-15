import { React, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {
    loggedin: false,
    fitness: this.props.fitness,
    username: this.props.username,
    userid: this.props.userid,
  };
  componentDidMount() {
    if (this.state.username) {
      this.setState({ loggedin: true });
    }
  }  
  componentDidUpdate() {
    if (this.state.username && !this.state.loggedin) {
      this.setState({ loggedin: true });
    }
  }
  render() {
    return (
      <div className="navbar">
        <div className="navbar__inner">
          <h1 className="navbar__header">Ultimate Scheduler</h1>
          {this.state.username ? (
            <h2 className="navbar__user">{this.state.username}</h2>
          ) : (
            <h2 className="navbar__user">Not Logged In</h2>
          )}
          {this.state.loggedin ? (
            this.state.fitness ? (
              <Link to={`/fitness/${this.state.username}/${this.state.userid}`}>
                <p className="navbar__fitness">Fitness</p>
              </Link>
            ) : (
              <p className="navbar__fitness">Fitness</p>
            )
          ) : null}
          {this.state.loggedin ? (
            <Link to="/">
              <p className="navbar__logout">Logout</p>
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Navbar