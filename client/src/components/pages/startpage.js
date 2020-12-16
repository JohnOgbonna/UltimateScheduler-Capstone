import {React, Component} from 'react'
import Dropdown from '../../components/assets/drop-down-arrow.svg' 
import axios from 'axios' 
import {Link} from 'react-router-dom'
import './startpage.scss' 
import Navbar from '../navBar/navbar'


class StartPage extends Component{ 
    state ={ 
        authenticated: false,
        start: false,
        user: '', 
        checkedforprograms: false,
        fitness: null
    } 
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
    componentDidUpdate(prevProps, prevState){ 
        if(this.state.authenticated && !this.state.checkedforprograms){ 

            let body = { 
                username: this.props.match.params.username, 
                userid: this.props.match.params.id
            }
        
            axios.post("http://localhost:7500/auth/services", body)
            .then(res=>{ 
                this.setState({fitness: res.data})

            })
            .catch(err=>{ 
                console.log(err)
            }) 
            this.setState({checkedforprograms: true}) 
         
            console.log(this.state.fitness)
        }
    }
    

    render(){ 
       
      
        if(this.state.authenticated){
        
        return( 
            <div className = "body">  <Navbar username={this.props.match.params.username} userid ={this.props.match.params.id}/>
            <div className ="loggedin">
                <h1 className ="loggedin__header">Welcome, {this.state.user}! </h1> 
                
                <h2 className = "program__header">Select a Program: </h2>
                <div className ="programs" id ="programs"> 
                   { this.state.fitness? 
                   <Link to ={`/fitness/${this.props.match.params.username}/${this.props.match.params.id}`}><div classname = "fitness" id ="program">
                    <h2 className ="program__header">Fitness Tracker</h2> 
                    <p className ="program_description">Click to view your activities</p>
                   </div> 
                   </Link>
                   : 
                   <Link to ={`/fitness-signup/${this.props.match.params.username}/${this.props.match.params.id}`}><div classname = "fitness" id ="program">
                   <h2 className ="program__header">Fitness</h2> 
                   <p className ="program_description">Not currently registered! Register now</p>
                  </div> </Link> } 
                  <div classname = "fitness" id ="program__money">
                    <h2 className ="program__header"> Spending Tracker</h2> 
                    <p className ="program_description">Comming 2021</p>
                   </div> 
                
                   </div>
                </div>
            </div>
            
        )} 
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
export default StartPage