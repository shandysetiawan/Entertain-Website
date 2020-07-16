const router = require('express').Router()
const entertainMeController = require('../controllers/entertainMeController')

router.get('/entertainme', entertainMeController.fetchMoviesSeries)

module.exports = router