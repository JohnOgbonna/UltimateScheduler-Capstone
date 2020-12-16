
import { React, Component } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FitnessSignup from "./components/fitness/fitness";
import {Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ExcercisePlanner from './components/fitness/excerciseplanner'
import MainFitnessPage from './components/fitness/mainFitnessPage'
import Login from './components/pages/login'
import Startpage from './components/pages/startpage'

class App extends Component {
  state = {
    date: new Date(),
    popup: false,
    showcalendar: false,
    loggedin: false, 
    username: null, 
    userid: null
   
  }; 
  login = (username, userid) =>{ 
    this.setState({ 
      login: true, 
      username: username, 
      userid: userid
    }); 
   
  }
  logout = () =>{ 

    this.setState({login:false})
  };

  onChange = (date) => {
    this.setState({ date });
  };
  onClick = () => {
    return <Calendar />;
  };

  enablepopup = () => {
    this.setState({ popup: !this.state.popup });
  };
  render() {
    console.log(this.state.username, this.state.u)
    var weekInMilliseconds = 6 * 24 * 60 * 60 * 1000;
    var nextWeek = new Date().getTime() + weekInMilliseconds;
    const options = { weekday: 'long', month: 'long', day: 'numeric' }
    console.log(new Date(nextWeek)); 
    return (
      <Router>
      <div className="App">
        <div>
          {/* <button
            className="calendarbutton"
            onClick={() => {
              this.setState({ showcalendar: !this.state.showcalendar });
            }}
          >
            SHOW CALENDAR
          </button> */}
          {this.state.showcalendar ? (
            <Calendar
              onChange={this.onChange}
              value={[new Date(), new Date(nextWeek)]}
              onClickDay={this.enablepopup}
              maxDate={new Date(nextWeek)}
              minDate={new Date()}
            />
          ) : null}
          <Switch>
        <Route path = '/' exact><Login login = {this.login}/></Route> 
        <Route path = '/start/:username/:id' component  = {Startpage}/> 
        <Route path = '/fitness-signup/:username/:id' component = {FitnessSignup}/> 
        <Route path = '/planner/:weight/:muscle/:gym/:username/:id' component = {ExcercisePlanner}/>
        <Route path = '/fitness/:username/:id' component = {MainFitnessPage}/> 
        </Switch>  
         {console.log(this.state.date.toLocaleDateString(undefined, options))}
        </div>
        {/* {this.state.popup ? <Calendar value ={this.state.date} /> : console.log(this.state.date.toLocaleDateString())} */}
      </div>
      </Router> 
      
    ); 
    
  }
}

export default App;
