const Movie = require('../models/movie')

class MoviesController {

    static fetchMovies(req, res, next) {

        Movie.find()
            .then((data) => {
                // console.log('hit movies')
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }


    static addMovie(req, res, next) {

        // console.log(req.body)

        const newMovie = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: (req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }

        Movie.create(newMovie)
            .then((data) => {
                res.status(201).json(data.ops[0])
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }

    static getMovieById(req, res, next) {

        // console.log(req.params)

        const movieId = req.params.movie_id

        Movie.getById(movieId)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }

    static updateMovie(req, res, next) {

        const movieId = req.params.movie_id

        const editMovie = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: String(req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }
        // console.log(editMovie)

        Movie.updateById(movieId, editMovie)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }

    static removeMovie(req, res, next) {

        const movieId = req.params.movie_id

        Movie.removeById(movieId)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }


}

module.exports = MoviesController