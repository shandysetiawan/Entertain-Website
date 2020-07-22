const { gql } = require('apollo-server')
const axios = require('axios')
const Redis = require('ioredis')
const redis = new Redis()
const baseURL = process.env.TV_SERIES_SERVICES_PATH

const typeDefs = gql`
type tvSeries {
    _id:String
    title:String
    overview:String
    poster_path:String
    popularity: String
    tags: String
}

extend type Query {
    gettvSeries:[tvSeries]
    getOnetvSeries(id:String): tvSeries
}

input InputtvSeries {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: String
  }

type StatusTVMessage {
    status: String
}

extend type Mutation {
    addtvSeries(tv_series: InputtvSeries): tvSeries
    edittvSeries(id: String, tv_series: InputtvSeries): StatusTVMessage
    removetvSeries(id: String): StatusTVMessage
}

`
const resolvers = {
    Query: {
        gettvSeries: async () => {
            // await redis.del('movieCache')

            const cacheTV = await redis.get('tvCache')

            if (cacheTV) {
                // console.log('pernah kesini ga')
                // console.log(cacheTV)
                return JSON.parse(cacheTV)

            } else {
                // console.log('kseini terus?')
                try {
                    const tvData = await axios.get(`${baseURL}/tv_series`)

                    await redis.set('tvCache', JSON.stringify(tvData.data))
                    // console.log(tvData)
                    return tvData.data
                } catch (error) {
                    console.log(error)
                }
            }

        },

        getOnetvSeries: async (parent, args, context, info) => {

            try {
                // console.log('>>>>>>>>>>>', args)
                const tvSeriesData = await axios.get(`${baseURL}/tv_series/${args.id}`)

                return tvSeriesData.data
            } catch (error) {
                console.log(error)
            }


        },
    },
    Mutation: {
        addtvSeries: async (parent, args, context, info) => {

            // console.log(args.movie.title)

            const newData = {
                title: String(args.tv_series.title),
                overview: String(args.tv_series.overview),
                poster_path: (args.tv_series.poster_path),
                popularity: args.tv_series.popularity,
                tags: args.tv_series.tags
            }

            try {
                // console.log('>>>>>>>>>>>', args)
                const newTVSeriesData = await axios.post(`${baseURL}/tv_series`, newData)
                await redis.del('tvCache')

                return newTVSeriesData.data
            } catch (error) {
                console.log(error)
            }

        },

        edittvSeries: async (parent, args, context, info) => {

            // console.log(args.movie.title)
            const tvId = args.id

            const editData = {
                title: String(args.tv_series.title),
                overview: String(args.tv_series.overview),
                poster_path: (args.tv_series.poster_path),
                popularity: args.tv_series.popularity,
                tags: args.tv_series.tags
            }

            try {
                // console.log('>>>>>>>>>>>', args)
                const updtData = await axios.put(`${baseURL}/tv_series/${tvId}`, editData)
                await redis.del('tvCache')

                return { status: 'successfully edit tv series' }
            } catch (error) {
                console.log(error)
            }

        },

        removetvSeries: async (parent, args, context, info) => {

            // console.log(args.movie.title)
            const tvId = args.id

            try {
                // console.log('>>>>>>>>>>>', args)
                const removeData = await axios.delete(`${baseURL}/tv_series/${tvId}`)
                await redis.del('tvCache')


                return { status: 'successfully remove tv series' }
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
