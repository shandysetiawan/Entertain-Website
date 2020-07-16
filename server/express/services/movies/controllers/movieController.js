const Movie = require('../models/movie')

class MoviesController {

    static fetchMovies(req, res, next) {

        Movie.find()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }


    static addMovie(req, res, next) {
        console.log(Movie)
        Movie.create(req.body)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }

    static getMovieById(req, res, next) {

    }

    static updateMovie(req, res, next) {

    }

    static removeMovie(req, res, next) {

    }


}

module.exports = MoviesController