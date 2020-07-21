import React, { } from 'react'
import Navbar from '../components/Navbar'
import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client'
import client, { GET_FAVS } from '../config/graphql'

// export const GET_FAV = gql`
// query{
//     favmovies @client
// }
// `

export default function AddFav() {
    const { loading, error, data: movies } = useQuery(GET_FAVS)
    // const { loading, data: movies } = useQuery(GET_FAV)

    if (loading) {
        return (<>
            <Navbar></Navbar>
        loading...
        </>)
    }

    if (movies.favmovies.length === 0) {
        return (<>
            <Navbar></Navbar>
    You haven't add any favorite movie
        </>)
    }

    return (<>
        <Navbar></Navbar>
        <div className="main-images mb-8 mt-5">
            <div className="images grid grid-cols-1 md:grid-cols-3 gap-8">
                {movies.favmovies.map((movie) => {
                    return <div className="image bg-white rounded-lg shadow-lg overflow-hidden">
                        <Link to={`/movies/${movie._id}`}>
                            <img src={movie.poster_path} alt="Contact with Customer support" className="w-full" style={{ width: "500px", height: "200px" }} title="Contact with Customer support" />
                            <span className="text-center p-2 text-gray-700 text-sm inline-block w-full text-bold">{movie.title}</span>
                        </Link>
                    </div>

                })}

            </div>
        </div>
    </>)
}   