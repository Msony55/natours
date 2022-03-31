module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// function yo(a,b,c){
//   return a+b+c;
// }
// let a=9,b=8,c=6;
// yo(a,b,c);

// module.exports = function(fn){

// }
