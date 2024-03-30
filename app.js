const express = require('express')
const filmRoutes = require('./routes/filmRoutes')
const workersFilmRoutes = require('./routes/workerFilmRoutes')

const app = express()

app.use(filmRoutes, workersFilmRoutes)

module.exports = app
