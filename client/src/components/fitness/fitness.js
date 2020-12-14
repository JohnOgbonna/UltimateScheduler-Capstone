import { React, Component } from "react";
import { Link, useRouteMatch } from "react-router-dom"; 
import axios from 'axios';
import './fitness-signup.scss';

class FitnessSignup extends Component {
  state = {
    weightloss: false,
    gainmuscle: false,
    usegym: null,
    step2: false,
    authenticated: false
  }; 
  componentDidMount(){ 
    let body = { 
        username: this.props.match.params.username, 
        userid: this.props.match.params.id, 
        
    }
    axios.post("http://localhost:7500/auth/authenticate", body)
    .then(res=>{ 
        this.setState({
            authenticated: res.data,
            user: this.props.match.params.username

        })
        console.log(res.data)
       
    }) 
    console.log(this.state.authenticated)
} 


  setWeightloss = (e) => {
    this.setState({ weightloss: e.target.checked });
  };
  setGainmuscle = (e) => {
    this.setState({ gainmuscle: false });
  };
  setGymaccess = (e) => {
    this.setState({ usegym: e.target.value });
  };
  setGymNoaccess = (e) => {
    this.setState({ usegym: !e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.weightloss !== this.state.weightloss ||
      prevState.gainmuscle !== this.state.gainmuscle ||
      this.state.usegym !== prevState.usegym
    ) {
      if (
        (this.state.weightloss || this.state.gainmuscle) &&
        this.state.usegym != null
      ) {
        this.setState({ step2: true });
      } else {
        this.setState({ step2: false });
      }
      if (this.state.step2 && !this.state.weightloss) {
        this.setState({ secondbrefing: true });
      }
    }
  }
  render() {
    let both = this.state.weightloss && this.state.gainmuscle;
    let link;
    let fullLink;

    link = `${this.state.weightloss}/${this.state.gainmuscle}/${this.state.usegym}`;

    if(this.state.authenticated){
    return(
      <div className="fitness">
        <header> </header>
        <div className="query">
        <h1 className ='Query__header'>Lets get started!</h1>
          <form>
            <div className = "query__boxes">
            <div className="query__choices">
             
             
              <h1 className="query__header">What is your goal?</h1>
           
              <div className="query__choices-box">
                <label htmlFor="weight" className="query__choices-choice">
                  Lose weight/ Keep Active
                </label>
                <input
                  type="checkbox"
                  id="weight"
                  checked={this.state.weightloss}
                  onChange={this.setWeightloss}
                />
              </div>
              <div className="query__choices-box">
                <label htmlFor="muscle" className="goals__choices-choice">
                  Gain muscle (COMMING SOON)
                </label>
                <input
                  type="checkbox"
                  id="muscle"
                  checked={this.state.gainmuscle}
                  onChange={this.setGainmuscle}
                />
              </div> 
              
            </div> 
            <div className="query__choices">
              <h1 className="query__header">
                Do you have access to a gym?
              </h1>
              <div className="query__choices-box">
                <label htmlFor="gymYes" className="goals__choices-choice">
                  Yes
                </label>
                <input
                  type="checkbox"
                  id="gymYes"
                  className="query__choices-choice"
                  checked={this.state.usegym}
                  onChange={this.setGymaccess}
                />
              </div>
              <div className="query__choices-box">
                <label htmlFor="gymNo" className="goals__choices-choice">
                  No
                </label>
                <input
                  type="checkbox"
                  id="gymNo"
                  className="query__choices-choice"
                  checked={!this.state.usegym}
                  onChange={this.setGymNoaccess}
                />
              </div>
            </div>
            </div>
            {this.state.step2 ? (
              <div>
                {this.state.weightloss ? (
                  <div className="choicebreifing">
                    <h3 className="choicebreifing">
                      The best way to lose weight and a good way to keep active is by eating well and
                      Cardiovascular excercise. This app will help you focus on
                      the latter! Lets look at some activities!
                    </h3>
                    {!this.state.gainmuscle ? (
                       <Link to={`/planner/${link}/${this.props.match.params.username}/${this.props.match.params.id}`}><button className="choicebreifing__button" type="button">
                        Next Step
                      </button></Link>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
            {this.state.step2 && this.state.gainmuscle ? (
              <div>
                <div className="choicebreifing">
                  <h3 className="choicebreifing__header">
                    The best way to build muscle is by heavy compound excercises
                    that target large muscle groups. It is common to break up
                    these muscle groups into the following categories: leg
                    muscles, chest muscles, back muscles, and arm muscles. Other
                    muscles like the abdominals are also important to maintian a
                    great physique. With this app, you can set your set/rep
                    goals in acccordance to your program requirements!
                  </h3>
                  <Link to={`/planner/${link}/${this.props.match.params.username}/${this.props.match.params.id}`}>
                    <button className="choicebreifing__button" type="button">
                      {" "}
                    </button>
                  </Link>
                </div>
              </div>
            ) : null}

            {console.log(fullLink)}
          </form>
        </div>
      </div>
    );
    } 
    else{ 
      return( 
        <div>
            <h1 className = "noauth__header">Not Logged in</h1>
            <Link to ="/"><button type = 'noauth__button' className>Login</button></Link>
        </div>
    )
    }
  }
}

export default FitnessSignup;
