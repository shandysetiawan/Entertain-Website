const router = require('express').Router()
const entertainMeController = require('../controllers/entertainMeController')
const moviesRoutes = require('./movie')
const tvSeriesRoutes = require('./tv_series')

router.get('/entertainme', entertainMeController.fetchMoviesSeries)

router.use('/movies', moviesRoutes)

router.use('/tv_series', tvSeriesRoutes)


module.exports = router