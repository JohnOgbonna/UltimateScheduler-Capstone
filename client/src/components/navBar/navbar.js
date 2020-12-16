import { React, Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss"

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
          <div className ="navbar__upper">
          <Link to = {`main/${this.props.username}/${this.props.userid}`}><h1 className="navbar__header">Ultimate Scheduler</h1></Link>
          <div className="navbar__inner">
          {this.state.username ? (
            <h2 className="navbar__user">{this.state.username}</h2>
          ) : (
            <h2 className="navbar__user">Not Logged In</h2>
          )}
          {this.state.loggedin ? (
            this.state.fitness ? (
              <Link to={`/fitness/${this.state.username}/${this.state.userid}`}>
                <p className="navbar__item">Fitness</p>
              </Link>
            ) : (
                <Link to={`/start/${this.state.username}/${this.state.userid}`}><p className="navbar__item">Fitness</p></Link>
            )
          ) : null}
          {this.state.loggedin ? (
            <Link to="/">
              <p className="navbar__item">Logout</p>
            </Link>
          ) : null}
        </div>
      </div>
      </div>
    );
  }
}
export default Navbar