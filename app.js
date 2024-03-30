const express = require('express')
const filmRoutes = require('./routes/filmRoutes')
const workersFilmRoutes = require('./routes/workerFilmRoutes')
const path = require('path')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use(filmRoutes, workersFilmRoutes)

module.exports = app
