const axios = require('axios')
const cheerio = require('cheerio')
const constructApiUrl = require('../utils')
const API_URLS = require('../constants')

exports.searchFilmWorkers = async (req, res) => {
    const { filmWorkerSearch } = req.params
    const { language } = req.query

    const API_URLS = constructApiUrl(language)

    try {
        const response = await axios.get(API_URLS.SEARCH, {
            params: {
                action: 'searchTerm',
                dataType: 'json',
                term: filmWorkerSearch,
            },
        })
        const workers = response.data?.names?.map((worker) => {
            const labelHtml = worker.label
            const $ = cheerio.load(labelHtml)
            const occupation = $('.info > div').last().text().trim()

            return {
                id: worker.id,
                namePerson: worker.value,
                occupation,
            }
        })

        res.json(workers)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.getFilmWorkerDetails = async (req, res) => {
    const { id = '', language } = req.query

    const API_URLS = constructApiUrl(language)

    try {
        const url = `${API_URLS.FILMWORKER}?name-id=${id}`
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)

        const name = $('#main-title a').text().trim()
        const nationality = $('dl.bio .nacionality li').text().trim()

        const wikipediaLink = $('dd.snets a').attr('href')

        const mainInfoItems = $('.main-info').find('ul.main-role li a')
        let occupation = mainInfoItems
            .map((i, el) => {
                return $(el).text().trim()
            })
            .get()
            .join(', ')

        const workerDetails = {
            id: Number(id),
            name,
            nationality,
            wikipediaLink,
            occupation,
        }

        res.json(workerDetails)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
