const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// Middelware
app.use(morgan('dev'));
app.use(express.json()); //process data
app.use((req, res, next) => {
    console.log('hello i am here for you!!!!!!!!');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toDateString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


// Route Handler
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt : req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

const getTour = (req, res) => {
    // :id/:x/:z? last is optional parameter
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    if (id > tours.length || !tour) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid Id',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

const createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (err) return console.log(err);
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    if (id > tours.length || !tour) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid Id',
        });
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
};

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    if (id > tours.length || !tour) {
        return res.status(404).json({
            status: 'Fail',
            message: 'Invalid Id',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};

const getAllUsers = (req,res) => {
    res.status(500).json({
        status:"error",
        message: "This route is not define yet.."
    })
};

const createUser = (req,res) => {
    res.status(500).json({
        status:"error",
        message: "This route is not define yet.."
    })
};

const updateUser = (req,res) => {
    res.status(500).json({
        status:"error",
        message: "This route is not define yet.."
    })
};

const deleteUser = (req,res) => {
    res.status(500).json({
        status:"error",
        message: "This route is not define yet.."
    })
};

const getUser = (req,res) => {
    res.status(500).json({
        status:"error",
        message: "This route is not define yet.."
    })
};
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

// my data
app.put('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => {
        if (el.id === id) {
            const newTour = Object.assign(req.body);
            if (newTour.name) el.name = newTour.name;
            if (newTour.duration) el.duration = newTour.duration;
            if (newTour.diffucilty) el.diffucilty = newTour.diffucilty;
            // console.log(newTour);
        }
    });
    res.send('Done');
});


// server
const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});
