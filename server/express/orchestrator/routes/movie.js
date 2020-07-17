const router = require('express').Router()
const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.fetchMovies)

router.post('/', moviesController.addMovie)

router.get('/:movie_id', moviesController.getOneMovie)

router.put('/:movie_id', moviesController.updateMovie)

router.delete('/:movie_id', moviesController.deleteMovie)


module.exports = router