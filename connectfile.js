console.log('file is connected')

var age = 20;

const addNumber = function(a,b){
    return a+b;
}

//--> isme hame jis var ko use krna hai use export krdo 
module.exports = {

    age,
    addNumber
}