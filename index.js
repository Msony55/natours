const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

// const textIn = fs.readFileSync('../sample.txt', 'utf-8');
// console.log(textIn);

// const textOut = `${textIn} my name is mohit. Please stay with me.\n Created on ${Date.now()}`;
// fs.writeFileSync('../sample.txt', textOut);


// fs.readFile('../sample.txt','utf-8', (err, data) => {
//     if (err )return console.log(err);
//     console.log(data);
// })
// console.log('we read the file');


// __dirName use 
// SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(element => slugify( element.productName, {lower : true}))
// console.log(slugs);

const server = http.createServer((req,res) => {
    // console.log(req.url);// getting path url
    // console.log(url.parse(req.url, true)); // get path url with url search query

    const {query, pathname} = url.parse(req.url, true); 

    // Overview Page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type':'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output);

    // Product Page
    }else if(pathname === '/product'){
        res.writeHead(200, {'Content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.end(output);

    // API
    }else if(pathname === '/api'){
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

