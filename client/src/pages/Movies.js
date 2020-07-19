import React from 'react'
import Navbar from '../components/Navbar'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const GET_MOVIES = gql`
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

    function clickDetail(id) {

    }


    if (loading) return <>Loading......</>

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
                    return <div className="max-w-sm rounded overflow-hidden shadow-lg mt-5" key={movie._id}>
                        <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" />
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
                                    onClick={() => clickDetail(movie._id)}
                                >
                                    Detail
      </button>
                            </Link>
                        </div>
                        <div className="px-6 py-4">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}