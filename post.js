const express = require('express');
const app = express()   // import express
const db = require('./db')
const passport = require('./auth')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// middleware function
// jab ham gte me hit krenge to date and time and kis url me hit kr rhe hai 
const logRequest = (req, res, next) =>{
 console.log(`[${new Date().toLocaleString()}]  request made to: ${req.originalUrl}`);
 next(); // move to the next phase
}

app.use(logRequest);

// passport authentication
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false})

app.get('/', function (req, res) {    // run in browser - localhost:3000/
  res.send('hello sir welcome to my server!')
})

// import the router files
const personrouter = require('./routes/personRoutes')
const menuItemrouter = require('./routes/menuItemRoutes');
const { jwtAuthMiddleware } = require('./jwt');

// use the ruotes
app.use('/person' , jwtAuthMiddleware, personrouter);  // jwt pass kiye to direct access nhi kr kste hamew token ki jarurat hogi pura data access krne k liye
app.use('/menu' ,  menuItemrouter);

app.listen(3000, () => {
  console.log('listening on port 3000')
}) // host number