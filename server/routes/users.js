const express = require("express");
const router = express.Router();
const fs = require("fs");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");



// router.use(cookieParser("secretcode"));

router.use(cors());
// router.use(passport.initialize());
// router.use(passport.session());
// require("../passportConfiguration")(passport);

readUsers = () => {
  const Users = fs.readFileSync("./data/users.json");
  return JSON.parse(Users);
};

// writeUsers = () =>{
//     fs.writeFileSync(
//         './data/users.json',
//         JSON.stringify(Users))

// }

//Routes
// router.post('/login', (req, res)=>{
//       console.log(req.body);
//       passport.authenticate('local', (err, user, info)=>{
//           if (err) throw err;
//           if(!user) res.send("That username doesn't exist")
//           else{
//               req.logIn(user, err=>{
//                   if(err) throw err;
//                   res.send('Successfully Logged in!')
//                   console.log(req.user);
//               })
//           }
//       })
//   })
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  let Users = readUsers();
  const user = Users.find((user) => user.username === username);
  if (user == null) {
    res.status(400).send("User does not exist");
    return null;
  }
  console.log(user);
  if (await bcrypt.compare(password, user.password)) {
    res.status(200).send(user);
  } else {
    res.status(401).send("wrong password");
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  let Users = readUsers();

  for (i = 0; i < Users.length; i++) {
    if (Users[i].username === username) {
      res.status(409).send("User already exists, choose a different username");
      return null;
    }
  }
  let hashpass = await bcrypt.hash(password, 10);
  let user = {
    userid: uuidv4(),
    username: username,
    password: hashpass,
  };

  Users.push(user);
  fs.writeFileSync("./data/users.json", JSON.stringify(Users));
  res.status(200).send(user);
});

router.post("/authenticate", (req, res) => {
  const { username, userid } = req.body;
  console.log(req.body);
  let Users = readUsers();
  const user = Users.find((user) => user.userid === userid);
  if (user == null) {
    res.send(false);
    return null;
  }
  console.log(user);
  if (user.username === username && user.userid === userid) {
    res.status(200).send(true);
  } else {
    res.send(false);
  }
}); 
router.post("/services", (req, res) => {
   const {username, userid} = req.body
   console.log(req.body)
    Users = readUsers();
    user = Users.find(person=> (person.userid === userid) && (person.username === username))
    
    if(user){ 
        if(user.fitness){
        res.send(user.fitness)
        } 
        else{ 
            res.send(null)
        }
    }
   else{ 
       res.status(404).send("cannot get user info")
   }
  }); 
  router.put("/registerfitness", (req, res) => {
    const {userid, fitness} = req.body
    Users = readUsers(); 
    user = Users.find(person=>person.userid === userid)
    if(user){ 
        let updateduser=user 
        updateduser.fitness = fitness 
        Users[Users.indexOf(user)] = updateduser 
        fs.writeFileSync("./data/users.json", JSON.stringify(Users)); 
        res.status(200).send(updateduser.fitness)
    } 
    else{ 
        res.status(404).send("cannot find user information")
    }
  })

router.get("/user", (req, res) => {
  console.log(req.body);
  res.send(req.user);
});

module.exports = router;
