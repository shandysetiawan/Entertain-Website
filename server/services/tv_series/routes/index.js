const router = require('express').Router()
const TVSeriesController = require('../controllers/TVSeriesController')

router.get('/tv_series', TVSeriesController.fetchTVSeries)

router.post('/tv_series', TVSeriesController.addTVSeries)

router.get('/tv_series/:tv_id', TVSeriesController.getTVSeriesById)

router.put('/tv_series/:tv_id', TVSeriesController.updateTVSeries)

router.delete('/tv_series/:tv_id', TVSeriesController.removeTVSeries)

module.exports = router