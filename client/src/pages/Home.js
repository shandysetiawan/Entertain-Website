import React from 'react'
import Navbar from '../components/Navbar'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const GET_ALL = gql`
query{
    getMovies{
    _id
    title
    overview
    popularity
    poster_path
	tags
    }
    gettvSeries{
        _id
        title
        overview
        popularity
        poster_path
        tags
        }
}
`

export default function Home() {
    const { loading, error, data: dataAll } = useQuery(GET_ALL)

    if (loading) return <>Loading......</>
    return (
        <>
            <Navbar></Navbar>
            <div className="Container px-2 overflow:hidden">
                <div className="flex flex-wrap mb-4 -mx-2 mt-5">
                    <div className="w-1/2 bg-gray-400 px-2 ">
                        <Link to='/movies' >
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                Movies
</button>
                        </Link>
                        <table className="table-fixed">
                            <thead>
                                <tr>
                                    <th className="px-6 py-2">Title</th>
                                    <th className="px-4 py-2">Overview</th>

                                </tr>
                            </thead>
                            <tbody>
                                {dataAll.getMovies.map((movie) => {
                                    return <tr key={movie._id}>
                                        <td className="border px-4 py-2">{movie.title}</td>
                                        <td className="border px-4 py-2">{movie.overview}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/2 bg-gray-500 px-2">
                        <Link to='/tv-series' >
                            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                TV Series
</button>
                        </Link>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Title</th>
                                    <th className="px-4 py-2">Overview</th>

                                </tr>
                            </thead>
                            <tbody>
                                {dataAll.gettvSeries.map((serie) => {
                                    return <tr key={serie._id}>
                                        <td className="border px-4 py-2">{serie.title}</td>
                                        <td className="border px-4 py-2">{serie.overview}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </>
    )
}