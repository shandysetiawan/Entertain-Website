import React, { } from 'react'
import Navbar from '../components/Navbar'
import { } from "react-router-dom";
import { gql, useQuery } from '@apollo/client'
import client, { GET_FAVS } from '../config/graphql'

// export const GET_FAV = gql`
// query{
//     favmovies @client
// }
// `

export default function AddFav() {
    const { loading, error, data: movies } = useQuery(GET_FAVS)

    if (loading) return <>loading...</>

    return (<>
        <Navbar></Navbar>
    Fav List
        {JSON.stringify(movies)}
    </>)
}   