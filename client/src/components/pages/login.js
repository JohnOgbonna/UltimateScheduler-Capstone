import { React, Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import "./login.scss"
class Login extends Component {
  state = {
    siginingUp: false,
    signupUser: "", 
    signupPass: "", 
    userid: "",
    pass: ""
  }; 

  usernameOnchange = (e) =>{ 
    this.setState({signupUser: e.target.value})
  } 
  passOnchange = (e) =>{ 
    this.setState({signupPass: e.target.value})
  } 

  submitSignup = (e) =>{ 
      e.preventDefault()
      let body = { 
          username: e.target.Susername.value,
          password: e.target.Spassword.value
      }
      axios.post('http://localhost:7500/auth/register', body) 
      .then(res=>{ 
          console.log(res)
          this.setState({
              userid: res.data.userid, 
              pass: res.data.password

        })
      }) 
      .catch(err=>{ 
          console.log(err) 
          alert('could not create user, internal error or user may already exist')
      })
  } 
  submitLogin = (e) =>{ 
    e.preventDefault()
    let body = { 
        username: e.target.username.value,
        password: e.target.password.value
    }
    axios.post('http://localhost:7500/auth/login', body) 
    .then(res=>{ 
        console.log(res)
        this.setState({
            username: res.data.username,
            userid: res.data.userid, 
            

      }) 
      window.location.href = `start/${this.state.username}/${this.state.userid}`
    }) 
    .catch(err=>{ 
        console.log(err) 
        alert('could not login')
    })
}

  render() {
    return (
      <div className="login">
       
        <h1 className="header">Login/Signup</h1>
        <div id = "loginsection">
        <h2 className='header__sub'>Login</h2>
        <form className="loginform" action="submit" onSubmit={this.submitLogin}>
          <div className="logins">
            <div className="loginbox">
              <label className="loginbox__username-label" htmlFor="username">
                Username:{" "}
              </label>
              <input
                type="text"
                className="loginbox__input"
                id="username"
                placeholder="Enter Username"
              />
            </div>
            <div className="loginbox">
              <label className="loginbox__username-label" htmlFor="password">
                Password:{" "}
              </label>
              <input
                type="password"
                className="loginbox__input"
                id="password"
                placeholder="Enter Password"
               
              />
            </div>
            <button type="submit" className="loginbox__button" >
              LOGIN
            </button>
          </div> 
        </form>
        </div>
        
          <h3 className="signuphere">
            Don't have an account? Sign Up{" "}
            <span
              className="linktoSignup"
              onClick={() =>
                this.setState({ siginingUp: !this.state.siginingUp })
              }
            >
              here
            </span>
          </h3> 
          {this.state.siginingUp ? 
          <div id="loginsection"> 
          <h2 className='header__sub'>Signup</h2>
            <form className="signupform" onSubmit={this.submitSignup}>
              <div className="loginbox">
                <label className="loginbox__username-label" htmlFor="Susername">
                  Username:{" "}
                </label>
                <input
                  type="text"
                  className="loginbox__input"
                  id="Susername"
                  placeholder="Enter Username" 
                  defaultValue={this.state.signupUser}
                  onChange={this.usernameOnchange}
                />
              </div>
              <div className="loginbox">
                <label className="loginbox__username-label" htmlFor="Spassword">
                  Password:{" "}
                </label>
                <input
                  type="password"
                  className="loginbox__input"
                  id="Spassword"
                  placeholder="Enter Password"
                  defaultValue={this.state.signupPass}
                  onChange={this.passOnchange}
                />
              </div> 
              <button type="submit" className="loginbox__button">
              SIGN UP!
            </button>
            </form> 
            {this.state.userid ?  
            <div className ="signupsuccess">
                <h3 className = "signupsucess__header">Successfully Created Account</h3>
            <Link to ={`/start/${this.state.username}/${this.state.userid}`}><button type="button" className="loginbox__button">
              Login
            </button></Link>
            </div>
            : null}
          </div> 
          :null}
       
        {console.log(this.state)}
      </div>
    );
  }
}

export default Login;
