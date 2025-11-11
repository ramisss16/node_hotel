
// --> npm me fs an os do library hoti hai jo hame bohat sari chise provide krte hai  
var fs = require('fs');
var os  = require('os')

var user = os.userInfo();  // ye os ka function hai jo user ki info deta hai
console.log(user);
console.log(user.username);  // isse user ka name milega 

// fs ka function hai jo greeting file bnake deta hai
fs.appendFile('greeting.txt','Hi ' +user.username+ '!\n' , () =>{  // function me pgle file source  , data , callback
    console.log('greeting');
})