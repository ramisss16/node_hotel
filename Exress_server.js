const express = require('express');
const app = express()   // import express
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const preson = require('./models/person')

const PORT = process.env.PORT || 3000  // env me PORT ki value present ho use kro ya 3000

app.get('/',function(req , res){    // run in browser - localhost:3000/
    res.send('hello sir welcome to my server!')
})

// --> jab bhi ham file me chnage krte hai to server ko firse restsrt krna pdhta hai 
// to use nodemon Express_server.js se contiunue server on rkh skte hai 
// /developer add k abd likhenge to server open hoga 
app.get('/developer', (req ,res) => {
    // res.send('hello !, i am developer')

    var dev = {
        name: "ramish khan",
        age: 21,
        college: "sirt"
    }
    res.get(dev)
})



app.listen(PORT, () =>{
    console.log('listening on port 3000')
}) // host number