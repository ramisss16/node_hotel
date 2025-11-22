const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { isMatch } = require('lodash');

// define the person schema
const personschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    age:{
        type: Number
    },

    work: {
        type: String,
        enum: ['waiter','chef','manager'],  // work me sirf ye teeno ho skte hai
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true  // only one email
    },

    address: {
        type: String
    },

    salary: {
        type: Number,
        required: true
    },

    username: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }

    
})



// Pre-save hook
personschema.pre('save', async function (next) {
    const person = this;

    // Run only if password is modified OR document is new
    if (!person.isModified('password')) return next();

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Replace plain password with hashed
        person.password = hashedPassword;

        next(); // Continue saving
    } catch (err) {
        next(err); // Pass error forward
    }
});

personschema.methods.comparePassword = async function (candidatepassword) {
    try{    
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatepassword, this.password);
        return isMatch;
    }
    catch(err){
      throw err;
    }
    
}

// verifying password
// jab pass inter krte to pass me salt add hota hai and hash me concert hota hai then compare hota hai 

// define person model
const person = mongoose.model('person', personschema);
module.exports = person;
