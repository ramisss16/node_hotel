////  ---> lodash ak library hai jo multiple chije perform krti hai 
var _ = require('lodash');  // import krne k liye used krte hai (- ki jagah kuch bhi name rkh skte hai )

const array = ['preson', 1 , 1 ,2, 2, 'preson' , 'js'];
var filter = _.uniq(array);   // ye uniq function array ki unique value deta hai 
console.log(filter)