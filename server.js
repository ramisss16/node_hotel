console.log("Ramisss")


// different ways of writting function
// function add(a,b){
//     return a+b;
// }

// var add = function(a,b){
//     return a+b
// }

// var add = (a,b) =>{return a+b}

// var add = (a,b) => a+b;

// var result = add(2,3)
// console.log(result)

// this function run without consol due to last me ()
// (function(){
//     console.log('Ramish is developer')
// })();

//---> callback function  --> ye kisi function bad call hota hai
// function callback(){
//     console.log('added complete')
// }

// var add = function(a,b,callback){
//     var result = a+b;
//     console.log(result);
//     callback();
// }

// add(10,15,callback);

// we can write as 
// add(10,15, () =>{
//     console.log('added succesful');
// })

const notes = require('./connectfile')  // -> isse hamne ye file connect kr diye hai jo usme hoga vo isme bhi run hoga

var ages = notes.age;  // ye hamne vha se laaya 
var add = notes.addNumber(12,12);
console.log(ages);
console.log(add);