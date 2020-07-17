const TVSeries = require('../models/tv_series')

class TVSeriesController {

    static fetchTVSeries(req, res, next) {

        TVSeries.find()
            .then((data) => {
                // console.log('hit tv')
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }


    static addTVSeries(req, res, next) {

        const addTV = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: (req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }


        TVSeries.create(addTV)
            .then((data) => {
                res.status(201).json(data.ops[0])
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }

    static getTVSeriesById(req, res, next) {

        const tvId = req.params.tv_id

        TVSeries.getById(tvId)
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }

    static updateTVSeries(req, res, next) {

        const tvId = req.params.tv_id

        const editTVSeries = {
            title: String(req.body.title),
            overview: String(req.body.overview),
            poster_path: String(req.body.poster_path),
            popularity: req.body.popularity,
            tags: req.body.tags
        }

        TVSeries.updateById(tvId, editTVSeries)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }

    static removeTVSeries(req, res, next) {

        const tvId = req.params.tv_id

        TVSeries.removeById(tvId)
            .then((data) => {
                res.status(201).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }


}

module.exports = TVSeriesController