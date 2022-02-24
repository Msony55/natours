const fs = require('fs');
const http = require('http');
const url = require('url');

// const textIn = fs.readFileSync('../sample.txt', 'utf-8');
// console.log(textIn);

// const textOut = `${textIn} my name is mohit. Please stay with me.\n Created on ${Date.now()}`;
// fs.writeFileSync('../sample.txt', textOut);


// fs.readFile('../sample.txt','utf-8', (err, data) => {
//     if (err )return console.log(err);
//     console.log(data);
// })
// console.log('we read the file');


// __dirName

// SERVER
const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
    const pathName = req.url;

    // Overview Page
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {'Content-type':'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output);

    // Product Page
    }else if(pathName === '/product'){
        res.end("You are in Product");

    // API
    }else if(pathName === '/api'){
        res.writeHead(200, {'Content-type':'text/html'});
        res.end(data);

    // Not Found
    }else{
        res.writeHead(404, {
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('<h1>Page Not Found</h1>');
    }
})

server.listen(8000,'127.0.0.1',() => {
    console.log('server is running.....');
})

