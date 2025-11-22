const express = require('express');
const router = express.Router();
const Person = require('./../models/person')
const {jwtAuthMiddleware , generateToken}  = require('./../jwt')

// Post router to add person

// app.post('/person',(req, res) =>{

//     const data = req.body;  // Asssuming the req body contain the person data 

//     // create a new person documnet using mongoose model

//     // const newperson = new person();
//     // newperson.name = data.name;
//     // newperson.age = data.age;     -----> ye sab alag likhna deficult ho jayega isliye ham direct niche wala likhte hai 
//     // newperson.mobile = data.mobile;


//     const newperson = new person(data);

//     // save the newperson to the data base
//     newperson.save((error, savedperson) =>{

//         if(error){
//             console.log('error saving person:',error);  // ==> 500 - is the http responde code which means internal error 
//             res.status(500).json({error: 'internal error server'})
//         }
//         else{
//             console.log('data saved successfully');
//             res.status(200).json(savedperson);     //  ==> 200 - is the http res. code wich means okay
//         }

//     })


// })    
////===> upper wale se hame callback kerror milta hai ham save use nhii krte ab 

// POST route to add a Person
router.post('/singup', async (req, res) => {
  try {
    const data = req.body;   // Assuming the req body contain the data process

    // create new person documnet using the mongoose model
    const newPerson = new Person(data);

    // save to db
    const response = await newPerson.save();
    console.log('data saved');

    // print  id and username paylod
    const payload = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload))
    
    // get generate token
    const token = generateToken(payload)
    console.log("token is : ", token)

    res.status(200).json({response:  response, token: token});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal  server error' });
  }
});

// routs login
 router.post('/login' , async(req, res) =>{
  try{
    // extract username and pass from req body
    const{username , password} = req.body;

    // find the username by username
    const user = await Person.findOne({username: username});

    // if user doent not exist or pass doesnt match , return error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid Username or Passsword'})
    }

    // geretate token
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = generateToken(payload);

    // return token as response
    res.json({token})
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'})
  }
 }) 

 // profile route  ---> isse ham token k through  user ka data access krte hai
router.get('/profile' , jwtAuthMiddleware , async(req, res) => {
  try{
    const userData = req.user;
    console.log("user Data: " , userData);

    const userID = userData.id;
    const user = await Person.findById(userID);

    res.status(200).json({user});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server Error'});
  }
}) 

//  get method to get the person 
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();   // fetch all persons
    console.log('data fetched');
    res.status(200).json(data);         // ✅ send the data
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal error' });
  }
});

//  get method to get paramer through work 
router.get('/:worktype', async (req, res) => {   // yha hamne '/person/:worktype' me ":" isliye lgaye ham worktype ki jagah kuch bhi rkh skte hai hai 
  try {                                           //  qki ham search krte time 'chef' , 'manager', 'waiter' search krenge
    const worktype = req.params.worktype // Extract the work type from  the URL parameter

    if(worktype === 'chef' || worktype === 'manager' || worktype === 'waiter'){     // hamne if condition isliye lgaye qki hamne sirf teen hi define kiye hai 
    const response = await Person.find({ work: worktype });                      // agar koi dog ya kuch or kre to ham time west kyu kre isliye consition lga diye 
    console.log('response fatch')
    res.status(200).json(response);
    }
    else{
      res.status(404).json({err: 'Invalid work type'})   // jab ham chef manager or waiter k alawa kuch or denge to ye run hogan
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: 'internal error' });
  }
})


// update person data === use put for update 
router.put('/:id', async(req, res) =>{

    try{
    const personID = req.params.id;  // extract the id from Url parameter
    const updatedpersondata = req.body; // update data for person 

    const response = await Person.findByIdAndUpdate(personID , updatedpersondata, {
              new: true,  // return the update documnet
              runVAlidators:  true, // run mongoose validator     
    })

    if(!response){
        res.status(404).json({error: 'person not found'})

    }

    console.log('data updated')
    res.status(200).json(response);
    }
    catch(err){
          console.log(err);
    res.status(500).json({ error: 'internal error' });
    }
})


// dalete person data == using delete
router.delete('/:id', async(req ,res) =>{
    try{
          const personID = req.params.id;  // extract the id from Url parameter

          // assumong you have a person  model
           const response = await Person.findOneAndDelete(personID);
           
    if(!response){
        res.status(404).json({error: 'person not found'})
 }

    console.log('data daleted')
    res.status(200).json({message: 'data delelted successfully'});

    }
    catch(err){
     console.log(err);
    res.status(500).json({ error: 'internal error' });
    }
})
module.exports = router;