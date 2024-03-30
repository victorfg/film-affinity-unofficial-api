const express = require('express')
const router = express.Router()
const searchController = require('../controllers/workersFilmController')

router.get(
    '/searchFilmWorkers/:filmWorkerSearch',
    searchController.searchFilmWorkers
)
router.get('/detailWorker', searchController.getFilmWorkerDetails)

module.exports = router
