const express = require('express');
const app = express();
const cors = require('cors');
const cardioRoutes = require('./routes/cardioRoutes')
const userRoutes = require('./routes/users')
const mongoose = require ('mongoose'); 
const passport = require('passport')
const passportLocal = require('passport-local').Strategy; 
const cookieParser = require('cookie-parser'); 
const bcrypt = require ("bcryptjs"); 
const session = require("express-session"); 
const bodyParser= require('body-parser');
const mysql = require('mysql');  
const initializePassport = require ('./passportConfiguration') 





//create connetction 
// const db = mysql.createConnection({
//   host: 'localhost', 
//   user: 'root', 
//   password: 'secret', 
//   database: 'lifeAppdB'
// }) 

// //Connect 
// db.connect((err)=>{
//     if(err){ 
//      console.log (err); 
//     } 
//     console.log('Database connected via SQL')
// }) 


// //create db 
// app.get('/createdb', (req, res)=>{ 
//   let sql = 'Create database lifeAppDb'
//   db.query(sql, (err, result) =>{ 
//     if(err) throw err; 
//     console.log(result); 
//     res.send('Database created...')
//   })
// })
let users = []
const port = 7500; 
//middleware
app.use(cors()); 

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 

app.use(session({ 
  secret: 'secretcode', 
  resave: true, 
  saveUninitialized: true
})) 
app.use(cookieParser('secretcode')) 

//Routes 
// app.post('/login', (req, res)=>{ 
//     console.log(req.body);
// }) 

// app.post('/register', (req, res)=>{ 
//   console.log(req.body);
// }) 

// app.get('/user', (req, res)=>{ 
//   console.log(req.body);
// })

app.use('/auth', userRoutes)
app.use('/cardio', cardioRoutes); 
app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
  });
  