const mongoose = require('mongoose')

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
    }
})

// define person model
const person = mongoose.model('person', personschema);
module.exports = person;
