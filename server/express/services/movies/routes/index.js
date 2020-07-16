const router = require('express').Router()
const movieController = require('../controllers/movieController')

router.get('/movies', movieController.fetchMovies)

router.post('/movies', movieController.addMovie)

router.get('/movies/:movie_id', movieController.getMovieById)

router.put('/movies/:movie_id', movieController.updateMovie)

router.delete('/movies/:movie_id', movieController.removeMovie)


module.exports = router