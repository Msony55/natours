const express = require('express');
const { getTour } = require('../controllers/viewsController');
const { getOverview } = require('../controllers/viewsController');

const viewrouter = express.Router();

// viewrouter.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Jonas',
//   });
// });

viewrouter.get('/', getOverview);
viewrouter.get('/tour/:slug', getTour);

module.exports = viewrouter;
