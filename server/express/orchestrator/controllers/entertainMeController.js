const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class entertainMeController {

    static async fetchMoviesSeries(req, res, next) {

        const cacheEntertainMe = await redis.get('moviesSeries')

        if (cacheEntertainMe) {
            res.status(200).json(JSON.parse(cacheEntertainMe))
        } else {

            try {
                const tvSeries = await axios.get("http://localhost:3002/tv_series")
                const movies = await axios.get("http://localhost:3001/movies")


                await redis.set('moviesSeries', JSON.stringify({ movies: movies.data, tvSeries: tvSeries.data }))

                res.status(200).json({ movies: movies.data, tvSeries: tvSeries.data })
            } catch (error) {
                res.status(500).json(error)
            }

        }


    }
}


module.exports = entertainMeController