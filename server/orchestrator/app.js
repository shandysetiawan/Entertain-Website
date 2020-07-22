require('dotenv').config()
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const moviesSchema = require('./schemas/moviesSchema')
const tvSeriesSchema = require('./schemas/tvSeriesSchema')
const port = process.env.PORT || 3000

const typeDefs = gql`
type Query
type Mutation
`

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, moviesSchema.typeDefs, tvSeriesSchema.typeDefs],
    resolvers: [moviesSchema.resolvers, tvSeriesSchema.resolvers]
})

const server = new ApolloServer({ schema })

server.listen({ port })
    .then(({ url }) => {
        console.log(`Apollo running at ${url}`)
    })