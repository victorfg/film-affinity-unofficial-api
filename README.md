# Film Affinity Unofficial API

This unofficial API provides detailed information about movies, film workers, and more, utilizing data from the FilmAffinity website. It's a Node.js based application that scrapes data from [FilmAffinity](https://www.filmaffinity.com) to deliver it in a convenient JSON format.

## About FilmAffinity

FilmAffinity is a popular movie database and review website. This API is not officially affiliated with FilmAffinity but leverages its extensive database to provide movie enthusiasts and developers with programmable access to a wealth of film-related information. This project aims to utilize the publicly accessible data on FilmAffinity to create a flexible and useful API for film data.

**Please note that this API is intended for educational and development purposes.**


## Multilingual Support

All endpoints in this API support multilingual responses. By default, the responses are in Spanish (es). To receive responses in English, you can use the `language` query parameter.

### Using the language Query Parameter

- **English Response**: Append `?language=en` to the endpoint URL.
- **Spanish Response**: Append `?language=es` to the endpoint URL or simply omit the parameter.

#### Examples

- Default Spanish Response: 
  - Without specifying language: `http://localhost:8000/endpoint`
  - Specifying Spanish explicitly: `http://localhost:8000/endpoint?language=es`
- English Response: 
  - Specifying English: `http://localhost:8000/endpoint?language=en`
- Concatenating with Other Parameters: 
  - `http://localhost:8000/endpoint?otherparam=value&language=en`

### Supported Endpoints

The multilingual feature is available on the following endpoints:

- `/searchFilms/{filmSearch}`
- `/searchFilmWorkers/{workerSearch}`
- `/detailFilm/{filmId}`
- `/detailWorker?id={workerId}`
- `/filterFilms`

## API Endpoints

### 1. GET `/searchFilms/{filmSearch}`

Retrieves information about movies based on the search term.

#### Parameters

- `{filmSearch}`: Text string representing the search term for the movie.

#### Response

- Status Code: `200 OK`
- Content: Array of JSON objects representing movies.

#### Example
GET http://localhost:8000/searchFilms/mysterious


### 2. GET `/searchFilmWorkers/{filmWorkerSearch}`

Fetches information about film industry professionals.

#### Parameters

- `{filmWorkerSearch}`: Text string representing the search term.

#### Response

- Status Code: `200 OK`
- Content: Array of JSON objects representing film professionals.

#### Example

GET http://localhost:8000/searchFilmWorkers/woody


### 3. GET `/detailFilm/{filmId}`

Provides detailed information about a specific movie.

#### Parameters

- `{filmId}`: Unique numeric identifier for a movie.

#### Response

- Status Code: `200 OK`
- Content: JSON object with detailed movie information.

#### Example

GET http://localhost:8000/detailFilm/472390


### 4. GET `/filterFilms`

Allows filtering movies and series based on various parameters.

#### Parameters

- `genres`, `orderby`, `fromyear`, `toyear`, `movietype`, `country`: Optional parameters for filtering.

#### Response

- Status Code: `200 OK`
- Content: JSON object with filtered results.

#### Example

GET http://localhost:8000/filterFilms?movietype=music|&country=US


### 5. GET `/detailWorker`

Retrieves detailed information about a film industry worker.

#### Parameters

- `id={workerId}`: Unique numeric identifier for a film worker.

#### Response

- Status Code: `200 OK`
- Content: JSON object with detailed worker information.

#### Example

GET http://localhost:8000/detailWorker?id=263200181


## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues.

## License

This project is open-sourced under the ISC License.

