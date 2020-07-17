const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class moviesController {

    static async fetchMovies(req, res, next) {

        const moviesCache = await redis.get('moviesCache')

        if (moviesCache) {
            res.status(200).json(JSON.parse(moviesCache))
        } else {

            try {

                const movies = await axios.get("http://localhost:3001/movies")

                await redis.set('moviesCache', JSON.stringify({ movies: movies.data }))

                res.status(200).json(movies.data)
            } catch (error) {
                res.status(500).json(error)
            }

        }
    }

    static async addMovie(req, res, next) {

        const newMovie = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: (req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }

        try {

            const createMovie = await axios.post("http://localhost:3001/movies", newMovie)

            await redis.del('moviesCache')
            await redis.del('moviesSeries')

            res.status(200).json(createMovie.data)
        } catch (error) {
            res.status(500).json(error)
        }


    }

    static async getOneMovie(req, res, next) {

        const movieId = req.params.movie_id
        // console.log(movieId)
        try {
            const movie = await axios.get(`http://localhost:3001/movies/${movieId}`)

            await redis.del('moviesCache')
            await redis.del('moviesSeries')

            res.status(200).json(movie.data)
        } catch (error) {
            res.status(500).json(error)
        }


    }

    static async updateMovie(req, res, next) {

        const movieId = req.params.movie_id

        const updtMovie = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: (req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }

        try {

            const editMovie = await axios.put(`http://localhost:3001/movies/${movieId}`, updtMovie)

            await redis.del('moviesCache')
            await redis.del('moviesSeries')

            // console.log('balikan editttt>>>', editMovie)
            res.status(200).json(editMovie.data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteMovie(req, res, next) {

        const movieId = req.params.movie_id

        try {

            const delMovie = await axios.delete(`http://localhost:3001/movies/${movieId}`)

            await redis.del('moviesCache')
            await redis.del('moviesSeries')

            res.status(200).json(delMovie.data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = moviesController

