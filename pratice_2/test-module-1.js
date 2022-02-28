// Method 1
// class Calculator {
//     add(a,b){
//         return a+b;
//     }

//     multiply(a,b){
//         return a*b;
//     }

//     divide(a,b){
//         return a/b;
//     }
// }

// module.exports = Calculator 


// Method 2
// module.exports = class {
//     add(a,b){
//         return a+b;
//     }

//     multiply(a,b){
//         return a*b;
//     }

//     divide(a,b){
//         return a/b;
//     }
// };


// Method 3
// exports.add = (a,b) => a+b;
// exports.multiply = (a,b) => a*b;
// exports.divide = (a,b) => a/b;


// Only function calling multiple time
console.log("I am here");

module.exports = () => console.log("You are in log");