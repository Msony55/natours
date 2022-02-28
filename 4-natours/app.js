const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json()); //process data
// app.get('/',(req,res) => {
//     // res.status(200).send('We are using express.js');
//     res.status(200).json({message : 'We are using express.js'});
// });

// app.post('/',(req,res) => {
//     // res.status(200).send('We are using express.js');
//     res.status(200).send('you are on post');
// });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
    );

app.get('/api/v1/tours',(req,res) => {
    res.status(200).json({
        status:'success',
        results : tours.length,
        data: {
            tours
        }
    });
});



// test on req.param
app.get('/api/v1/tours/:id',(req,res) => {   // :id/:x/:z? last is optional parameter
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    
    if(id > tours.length || !tour){
        return res.status(404).json({
            status:"Fail",
            message : "Invalid Id"
        });
    }

    res.status(200).json({
        status:'success',
        data: {
            tour
        }
    });
});

app.post('/api/v1/tours',(req,res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err  => {
        if (err) return console.log(err);
        res.status(201).json({
            status:'success',
            data:{
                tour : newTour
            }
        })
    });
});

const port = 3000;
app.listen(port,() => {
    console.log(`app running on port ${port}`);
})