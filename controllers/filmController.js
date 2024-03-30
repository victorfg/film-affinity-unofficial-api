const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const constructApiUrl = require('../utils')
const API_URLS = require('../constants')

async function getFilmsList(term, searchUrl) {
    try {
        const response = await axios.get(searchUrl, {
            params: {
                action: 'searchTerm',
                dataType: 'json',
                term: term,
            },
        })
        return response?.data?.movies
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.searchFilms = async (req, res) => {
    const { filmSearch } = req.params
    const { language } = req.query

    const API_URLS = constructApiUrl(language)

    try {
        const moviesRaw = await getFilmsList(filmSearch, API_URLS.SEARCH)
        const movies = moviesRaw.map((movie) => {
            return {
                id: movie.id,
                nameMovie: movie.value,
            }
        })

        res.json(movies)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.detailFilm = async (req, res) => {
    const { idFilm } = req.params
    const { language } = req.query

    const API_URLS = constructApiUrl(language)

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`${API_URLS.FILM}${idFilm}.html`, {
            waitUntil: 'networkidle2',
        })

        const filmExtractDetails = await page.evaluate((id) => {
            function getTextBasedOnIndex(index) {
                const dtElements = document.querySelectorAll(
                    '#left-column dl.movie-info dt'
                )
                if (index < dtElements.length) {
                    const ddSibling = dtElements[index].nextElementSibling
                    return ddSibling ? ddSibling.innerText.trim() : ''
                }
                return ''
            }

            const title = getTextBasedOnIndex(0)
            const year = getTextBasedOnIndex(1)
            const duration = getTextBasedOnIndex(2)
            const country = getTextBasedOnIndex(3)
            const director = getTextBasedOnIndex(4)
            const script = getTextBasedOnIndex(5)
            const cast = [
                ...document.querySelectorAll('#left-column .slick-track li'),
            ]
                .map((actorElement) => {
                    const name = actorElement
                        .querySelector('.name')
                        ?.innerText.trim()
                    const imageUrl = actorElement.querySelector('img')?.src
                    const linkElement = actorElement.querySelector('a.link')
                    let actorId = null

                    if (linkElement) {
                        const href = linkElement.getAttribute('href')
                        const idMatch = href.match(/name-id=(\d+)/)
                        if (idMatch && idMatch[1]) {
                            actorId = idMatch[1]
                        }
                    }

                    return name && imageUrl && actorId
                        ? { name, imageUrl, id: actorId }
                        : null
                })
                .filter((actor) => actor !== null)
            const music = getTextBasedOnIndex(7)
            const photography = getTextBasedOnIndex(8)
            const companies = getTextBasedOnIndex(9)
            const genre = getTextBasedOnIndex(10)
            const groups = getTextBasedOnIndex(11)
            const synopsis = getTextBasedOnIndex(12)

            const rating = document
                .querySelector(
                    '#right-column #rat-avg-container #movie-rat-avg'
                )
                .innerText.trim()
            const votes = document
                .querySelector('#right-column #movie-count-rat span')
                .innerText.trim()

            return {
                id: parseInt(id, 10),
                title,
                year,
                duration,
                country,
                director,
                script,
                cast,
                music,
                photography,
                companies,
                genre,
                groups,
                synopsis,
                rating,
                votes,
            }
        }, idFilm)

        await browser.close()

        res.json(filmExtractDetails)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.filterFilms = async (req, res) => {
    try {
        const {
            language,
            genres = '',
            chv = 0,
            orderby = 'avg',
            movietype = 'full|',
            country = '',
            fromyear = 1874,
            toyear = 2024,
            ratingcount = 1,
            runtimemin = 0,
            runtimemax = 7,
            platforms = [],
        } = req.query

        const API_URLS = constructApiUrl(language)

        const url = `${API_URLS.FILTERFILMS}?genres=${encodeURIComponent(genres)}&chv=${chv}&orderby=${orderby}&movietype=${encodeURIComponent(movietype)}&country=${country}&fromyear=${fromyear}&toyear=${toyear}&ratingcount=${ratingcount}&runtimemin=${runtimemin}&runtimemax=${runtimemax}&platforms=${platforms}`
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        const films = []
        $('#top-movies > li').each((i, elem) => {
            const movieCard = $(elem).find('.movie-card')
            const titleElem = movieCard.find('.mc-title a')
            const yearElem = movieCard.find('.mc-year')
            const ratingElem = $(elem).find('.avg-rating')

            const link = titleElem.attr('href')
            if (link) {
                const idMatch = link.match(/film(\d+)\.html/)
                if (idMatch && idMatch[1]) {
                    films.push({
                        id: parseInt(idMatch[1], 10),
                        title: titleElem.text().trim(),
                        year: yearElem.text().trim(),
                        rating: ratingElem.text().trim(),
                    })
                }
            }
        })
        res.status(200).json(films)
    } catch (error) {
        res.status(500).send(`Error al filtrar películas: ${error.message}`)
    }
}
