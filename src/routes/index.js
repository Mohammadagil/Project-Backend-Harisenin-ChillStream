const express = require('express');
const router = express.Router();

const genreRoutes = require('./genre.route');
const filmRoutes = require('./film.route');
const episodeRoutes = require('./episode.route');
const packageRoutes = require('./package.route');
const myListRoutes = require('./mylist.route');
const orderRoutes = require('./order.route');
const paymentRoutes = require('./payment.route');

router.use('/genres', genreRoutes);
router.use('/films', filmRoutes);
router.use('/episodes', episodeRoutes);
router.use('/packages', packageRoutes);
router.use('/mylists', myListRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
