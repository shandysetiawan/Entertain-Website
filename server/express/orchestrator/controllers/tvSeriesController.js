const Redis = require('ioredis')
const redis = new Redis()
const axios = require('axios')

class tvSeriesController {

    static async fetchtvSeries(req, res, next) {
        // console.log('fetch orcht tv')

        const tvSeriesCache = await redis.get('tvSeriesCache')

        if (tvSeriesCache) {
            // console.log(tvSeriesCache)
            res.status(200).json(JSON.parse(tvSeriesCache.tv_series))
        } else {

            try {

                const tv_series = await axios.get("http://localhost:3002/tv_series")
                // console.log('first try')
                // console.log(tv_series)
                await redis.set('tvSeriesCache', JSON.stringify({ tv_series: tv_series.data }))


                res.status(200).json(tv_series.data)
            } catch (error) {
                res.status(500).json(error)
            }

        }
    }

    static async addTvSeries(req, res, next) {

        const newTVSeries = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: (req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }
        // console.log(newTVSeries)
        try {

            const createTVSeries = await axios.post("http://localhost:3002/tv_series", newTVSeries)

            await redis.del('tvSeriesCache')
            await redis.del('moviesSeries')

            // console.log('orchst', createTVSeries)

            res.status(201).json(createTVSeries.data)

        } catch (error) {
            res.status(500).json(error)
        }


    }

    static async getOneTvSeries(req, res, next) {

        const TVId = req.params.tv_id
        try {
            const tv_series = await axios.get(`http://localhost:3002/tv_series/${TVId}`)

            res.status(200).json(tv_series.data)
        } catch (error) {
            res.status(500).json(error)
        }


    }

    static async updateTvSeries(req, res, next) {

        const TVId = req.params.tv_id

        const updtTVSeries = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: (req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }

        try {

            const editTVSeries = await axios.put(`http://localhost:3002/tv_series/${TVId}`, updtTVSeries)

            await redis.del('tvSeriesCache')
            await redis.del('moviesSeries')

            res.status(200).json(editTVSeries.data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteTvSeries(req, res, next) {

        const TVId = req.params.tv_id

        try {

            const delTVSeries = await axios.delete(`http://localhost:3002/tv_series/${TVId}`)

            await redis.del('tvSeriesCache')
            await redis.del('moviesSeries')

            res.status(200).json(delTVSeries.data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = tvSeriesController

