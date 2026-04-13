import { config } from "dotenv"
import express from  "express"
import session from "express-session";
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import morgan from "morgan";


config()

const app =  express()
app.use(morgan('dev'));



app.get("/" , (req, res)=>{
    res.send("Hello world")
})

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
)


app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
    clientID : process.env.CLIENT_ID ,
    clientSecret : process.env.CLIENT_SECRET ,
    callbackURL : "/auth/google/callback"
} , (_, __, profile , done)=>{
    return done(null , profile)
}))

app.get("/auth/google" , 
    passport.authenticate("google" , {scope :["profile" , "email" ]})
)
app.get("/auth/google/callback" , 
    passport.authenticate('google' , {failureRedirect : "/"}),
    (req , res) =>{
        console.log(req.user)
        res.send('Google Authentication successful')
    }
)

app.listen(3000 , ()=>{
    console.log("Server running at port 3000")
})