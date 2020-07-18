const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const baseURL = 'http://localhost:3001'

const typeDefs = gql`
type Movie {
    _id:String
    title:String
    overview:String
    poster_path:String
    popularity: Float
    tags: String
}

extend type Query {
    getMovies:[Movie]
    getMovie(id:String): Movie
}

input InputMovie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

type StatusMessage {
    status: String
}

extend type Mutation {
    addMovie(movie: InputMovie): Movie
    editMovie(id: String, movie: InputMovie): StatusMessage
    removeMovie(id: String): StatusMessage
}

`
const resolvers = {
    Query: {
        getMovies: async () => {
            // await redis.del('movieCache')

            const cacheMovies = await redis.get('moviesCache')

            if (cacheMovies) {
                console.log('pernah kesini ga')
                console.log(cacheMovies)
                return JSON.parse(cacheMovies)

            } else {
                console.log('kseini terus?')
                try {
                    const moviesData = await axios.get(`${baseURL}/movies`)

                    await redis.set('moviesCache', JSON.stringify(moviesData.data))
                    // console.log(moviesData)
                    return moviesData.data
                } catch (error) {
                    console.log(error)
                }
            }

        },

        getMovie: async (parent, args, context, info) => {

            try {
                console.log('>>>>>>>>>>>', args)
                const movieData = await axios.get(`${baseURL}/movies/${args.id}`)

                return movieData.data
            } catch (error) {
                console.log(error)
            }


        },
    },
    Mutation: {
        addMovie: async (parent, args, context, info) => {

            // console.log(args.movie.title)

            const newMovie = {
                title: String(args.movie.title),
                overview: String(args.movie.overview),
                poster_path: (args.movie.poster_path),
                popularity: args.movie.popularity,
                tags: args.movie.tags
            }

            try {
                // console.log('>>>>>>>>>>>', args)
                const newData = await axios.post(`${baseURL}/movies`, newMovie)
                await redis.del('moviesCache')

                return newData.data
            } catch (error) {
                console.log(error)
            }

        },

        editMovie: async (parent, args, context, info) => {

            // console.log(args.movie.title)
            const movieId = args.id

            const updateMovie = {
                title: String(args.movie.title),
                overview: String(args.movie.overview),
                poster_path: (args.movie.poster_path),
                popularity: args.movie.popularity,
                tags: args.movie.tags
            }

            try {
                // console.log('>>>>>>>>>>>', args)
                const editData = await axios.put(`${baseURL}/movies/${movieId}`, updateMovie)
                await redis.del('moviesCache')

                return { status: 'successfully edit movie' }
            } catch (error) {
                console.log(error)
            }

        },

        removeMovie: async (parent, args, context, info) => {

            // console.log(args.movie.title)
            const movieId = args.id

            try {
                // console.log('>>>>>>>>>>>', args)
                const removeData = await axios.delete(`${baseURL}/movies/${movieId}`)
                await redis.del('moviesCache')


                return { status: 'successfully remove movie' }
            } catch (error) {
                console.log(error)
            }

        },






    }
}

module.exports = {
    typeDefs,
    resolvers
}
