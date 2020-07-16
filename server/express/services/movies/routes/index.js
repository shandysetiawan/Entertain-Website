const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.get('/movies', movieController.fetchMovies)

router.post('/movies', movieController.addMovie)

router.get('/movies/:movies_id', movieController.getMovieById)

router.put('/movies/:movies_id', movieController.updateMovie)

router.delete('/movies/:movies_id', movieController.removeMovie)


module.exports = router