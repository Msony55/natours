const express = require('express');
const { isLoggedIn } = require('../controllers/authController');
const { getTour, getLoginForm } = require('../controllers/viewsController');
const { getOverview } = require('../controllers/viewsController');

const viewrouter = express.Router();

// viewrouter.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Jonas',
//   });
// });
viewrouter.route(isLoggedIn);

viewrouter.get('/', getOverview);
viewrouter.get('/tour/:slug', getTour);

viewrouter.get('/login', getLoginForm);
// viewrouter.get('/tour/:slug', getTour);

module.exports = viewrouter;
