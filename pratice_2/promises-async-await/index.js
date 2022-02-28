// const { rejects } = require("assert");
const fs = require("fs");
// const { resolve } = require("path");
// const http = require("http").createServer();
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not found file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("could not write file");
      resolve("sucess");
    });
  });
};


//  async/await
const getDogpic = async() => {
    try{
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);
        console.log(`${data}`);
        console.log(data);
    
        const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([res1,res2,res3]);
        const img = all.map(el => el.body.message)
        console.log(img);
    
        await writeFilePro('dog-img.txt', img.join('\n'));
        console.log("Random dog image saved file");
    }
    catch(err){
        console.log(err);
        throw err;
    }
    return 'Complete!!!...';
}
// console.log("1:will get dog pics");
// getDogpic().then(x => {
//     console.log(x);
//     console.log("3:Done get dog pic");
// }).catch(err => {
//     console.log(err);
// })
// console.log("2:Done get dog pic");


// Self closing function using async/await
(async () => {
    try{
        console.log("1:will get dog pics");
        const x = await getDogpic();
        console.log(x);
        console.log("3:Done get dog pic");

    }catch(err){
        console.log("Error");
    }
})();


//  Promises
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//     // fs.writeFile("dog-img.txt", res.body.message, (err) => {
//     //   if (err) return console.log(err.message);
//     //   console.log("Random dog image saved file");
//     // });
//   })
//   .then(() => {
//       console.log('Random dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// // callback hell problem
// // there is problem in complex nested callbacks to mantain its pyramid structure
// // fs.readFile(`${__dirname}/dog.txt`,(err,data) => {
// //     // if(err) console.log(err);
// //     // console.log(`Breed: ${data}`);

// //     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// //     .then(res => {
// //         console.log(res.body.message);

// //         fs.writeFile('dog-img.txt',res.body.message, err => {
// //             if(err) return console.log(err.message);
// //             console.log('Random dog image saved file');
// //         });
// //     })
// //     .catch(err => {
// //         console.log(err.message);
// //     })
// // });

// http.listen(8000, "127.0.0.1", () => {
//   console.log("Server is running on 8000");
// });
