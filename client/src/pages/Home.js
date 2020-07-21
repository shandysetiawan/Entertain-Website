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

    if (loading) {
        return (<>
            <Navbar></Navbar>
        loading...
        </>)
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="Container px-2">
                <div className="flex flex-wrap mb-4 -mx-2 mt-5">
                    <div className="w-1/2 bg-teal-100 px-2 ">
                        <Link to='/movies' >
                            <button className="mt-5 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                Movies List
</button>
                        </Link>

                        <table className="text-left w-full mb-5 mt-5">
                            <thead className="bg-teal-400 flex text-white w-full text-center">
                                <tr className="flex w-full mb-4">
                                    <th className="p-4 w-1/2">Movie Title</th>
                                    <th className="p-4 w-1/2">Overview</th>
                                </tr>
                            </thead>
                            <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full" style={{ height: "50vh" }}>
                                {dataAll.getMovies.map((movie) => {
                                    return <tr className="flex w-full mb-4 bg-white " key={movie._id}>
                                        <td className="p-4 w-1/2">{movie.title}</td>
                                        <td className="p-4 w-1/2">{movie.overview}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-1/2 bg-green-100 px-2">
                        <Link to='/tv-series' >
                            <button className="mt-5 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
                                TV Series List
</button>
                        </Link>
                        <table className="text-left w-full mb-5 mt-5">
                            <thead className="bg-green-400 flex text-white w-full text-center">
                                <tr className="flex w-full mb-4">
                                    <th className="p-4 w-1/2">TV Series Title</th>
                                    <th className="p-4 w-1/2">Overview</th>
                                </tr>
                            </thead>
                            <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style={{ height: "50vh" }}>
                                {dataAll.gettvSeries.map((serie) => {
                                    return <tr className="flex w-full mb-4 bg-white" key={serie._id}>
                                        <td className="p-4 w-1/2">{serie.title}</td>
                                        <td className="p-4 w-1/2">{serie.overview}</td>
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