const LocalStrategy = require('passport-local').Strategy
const bcrypt = require ('bcryptjs'); 


module.exports = (passport) =>{
passport.use( 
    new LocalStrategy((username, password, done)=>{ 
        username.findOne({username: username}, (err, user)=>{ 
            if (err) throw err; 
            if(!user) return done(null, false, {message: 'that username does not exist'}); 
            bcrypt.compare(password, user.password, (err, result)=>{ 
                if(err) throw err; 
                if(result === true){ 
                    return done(null, user)
                }
                else{ 
                    return done(null, false)
                }
            })
        })
    })
) 

passport.serializeUser((user, cb)=>{ 
    cb(null, user.id); 
})
passport.deserializeUser((id, cb)=>{ 
    User.findOne({_id: id}, (err, user)=>{ 
        cb(err, user); 
    })
})
}








function initialize(passport){ 
    const authenticate = (username, password, done) =>{ 

    }
    passport.use( new LocalStrategy({usernameField: 'email'}))
}