// console.log(` hello ${arguments}`);
// console.log(require('module').wrapper);


// Method 1
// const cal = require('./test-module-1');
// const calc1 = new cal();
// console.log(calc1.add(2,2));
// console.log(calc1.multiply(2,2));
// console.log(calc1.divide(2,2));

// Method 2
// const calc2 = require('./test-module-1');
// console.log(calc2.add(2,2));
// console.log(calc2.multiply(2,2));
// console.log(calc2.divide(2,2));


// Method 3
// const {add, multiply, divide } = require('./test-module-1');
// console.log(add(2,2));
// console.log(multiply(2,2));
// console.log(divide(2,2));


// caching
// in caching everything loading once but after these its past from caching
require('./test-module-1')();
require('./test-module-1')();
require('./test-module-1')();
