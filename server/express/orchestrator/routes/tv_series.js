const router = require('express').Router()
const tvSeriesController = require('../controllers/tvSeriesController')

router.get('/', tvSeriesController.fetchtvSeries)

router.post('/', tvSeriesController.addTvSeries)

router.get('/:tv_id', tvSeriesController.getOneTvSeries)

router.put('/:tv_id', tvSeriesController.updateTvSeries)

router.delete('/:tv_id', tvSeriesController.deleteTvSeries)


module.exports = router