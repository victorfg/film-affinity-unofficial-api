function constructApiUrl(language = 'es') {
    const baseUrls = {
        es: {
            SEARCH: 'https://www.filmaffinity.com/es/search-ac2.ajax.php',
            FILM: 'https://www.filmaffinity.com/es/film',
            FILMWORKER: 'https://www.filmaffinity.com/es/name.php',
            FILTERFILMS: 'https://www.filmaffinity.com/es/topgen.php',
        },
        en: {
            SEARCH: 'https://www.filmaffinity.com/us/search-ac2.ajax.php',
            FILM: 'https://www.filmaffinity.com/us/film',
            FILMWORKER: 'https://www.filmaffinity.com/us/name.php',
            FILTERFILMS: 'https://www.filmaffinity.com/us/topgen.php',
        }
    };

    return baseUrls[language] || baseUrls.es;
}

module.exports = constructApiUrl;