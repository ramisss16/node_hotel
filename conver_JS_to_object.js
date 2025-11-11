
//----> convert json string to object
const jsonString = '{"Name": "jone" , "age": 25, "city": "new york"}';
const jsonObject = JSON.parse(jsonString);  // convert jsonstring to json object
console.log(jsonObject.Name);  // output - jone

//--> convert json object to  string
const Objectconvert = {
    "Name" : "Alice",
    "age": 25
};
const jsonStringifield = JSON.stringify(Objectconvert); // convert object to string
console.log(jsonStringifield);