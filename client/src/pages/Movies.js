import React from 'react'
import Navbar from '../components/Navbar'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
// import { favMovies } from '../config/graphql'
import client, { GET_FAVS } from '../config/graphql'
import Swal from 'sweetalert2'

export const GET_MOVIES = gql`
query{
    getMovies{
    _id
    title
    overview
    popularity
    poster_path
	tags
    }
}
`

export default function Movies() {
    const { loading, error, data: movies } = useQuery(GET_MOVIES)
    // const { data } = useQuery(GET_FAVS)



    // function addFav(datamovie) {

    //     const found = favMovies().find(element => element._id === datamovie._id)

    //     if (found) {
    //         Swal.fire('OOPS...', 'You already add this movie to your favorite!', 'warning')

    //     } else {
    //         // let currentStore = favMovies([...currentStore, datamovie])
    //         favMovies().push(datamovie)
    //         // favMovies().concat(datamovie)

    //         Swal.fire('Success!', 'Success added movie to My Favorites', 'success')
    //     }

    // }

    function addFav(datamovie) {
        const { favmovies } = client.readQuery({ query: GET_FAVS })

        const found = favmovies.find(element => element._id === datamovie._id)

        if (found) {
            Swal.fire('OOPS...', 'You already add this movie to your favorite!', 'warning')

        } else {
            client.writeQuery({
                query: GET_FAVS,
                data: {
                    // favmovies
                    favmovies: [...favmovies, datamovie]
                }
            })

            Swal.fire('Success!', 'Success added movie to My Favorites', 'success')
        }

    }


    if (loading) return <>Loading......</>
    if (error) return <>Error.....{JSON.stringify(error)}.</>


    return (
        <>
            <Navbar></Navbar>
            <Link to={`/movies/addMovie`}>
                <button
                    className="mt-5 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                >
                    Add New Movie
      </button>
            </Link>

            <div className="grid grid-cols-3 gap-4">
                {movies.getMovies.map((movie) => {
                    return <div className="max-w-sm rounded overflow-hidden shadow-lg mt-5 bg-white" key={movie._id}>
                        <img className="w-full" style={{ width: "500px", height: "200px" }} src={movie.poster_path} alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{movie.title}</div>
                            <p className="text-gray-700 text-base">
                                {movie.overview}
                            </p>
                            <Link to={`/movies/${movie._id}`}>
                                <button
                                    className="mt-5 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                >
                                    Detail
      </button>
                            </Link>
                            <button
                                className="mt-5 bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => addFav(movie)}
                            >
                                Add to Fav
      </button>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}