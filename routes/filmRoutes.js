const express = require('express')
const router = express.Router()
const searchController = require('../controllers/filmController')

router.get('/searchFilms/:filmSearch', searchController.searchFilms)
router.get('/detailFilm/:idFilm', searchController.detailFilm)
router.get('/filterFilms/', searchController.filterFilms)

module.exports = router
