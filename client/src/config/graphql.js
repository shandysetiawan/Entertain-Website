import { ApolloClient, InMemoryCache, makeVar, gql } from '@apollo/client'

// export const favMovies = makeVar([])

// const cache = new InMemoryCache({
//     typePolicies: {
//         Query: {
//             fields: {
//                 favmovies: {
//                     read: () => { return favMovies() }
//                 }
//             }
//         }
//     }
// })

const cache = new InMemoryCache()

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache
})

export const GET_FAVS = gql`
query{
    favmovies
}`

client.writeQuery({
    query: GET_FAVS,
    data: {
        favmovies: []
    }
})



export default client