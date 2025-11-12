const express = require('express');
const app = express()   // import express
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {    // run in browser - localhost:3000/
  res.send('hello sir welcome to my server!')
})

// import the router files
const personrouter = require('./routes/personRoutes')
const menuItemrouter = require('./routes/menuItemRoutes')

// use the ruotes
app.use('/person' , personrouter);
app.use('/menu' ,  menuItemrouter);

app.listen(3000, () => {
  console.log('listening on port 3000')
}) // host number