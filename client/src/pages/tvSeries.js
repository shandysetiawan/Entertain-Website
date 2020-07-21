import React from 'react'
import Navbar from '../components/Navbar'
import { gql, useQuery } from '@apollo/client'

const GET_TVSERIES = gql`
query{
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

export default function TVSeries() {
    const { loading, error, data: series } = useQuery(GET_TVSERIES)

    if (loading) {
        return (<>
            <Navbar></Navbar>
        loading...
        </>)
    }

    if (series.gettvSeries.length === 0) {
        return (<>
            <Navbar></Navbar>
    No TV Series data yet, please input first
        </>)
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="grid grid-cols-3 gap-4 bg-green-100">
                {series.gettvSeries.map((serie) => {
                    return <div className="max-w-sm rounded overflow-hidden shadow-lg mt-5 bg-white">
                        <img className="w-full" style={{ width: "500px", height: "200px" }} src={serie.poster_path} alt={serie.title} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{serie.title}</div>
                            <p className="text-gray-700 text-base">
                                {serie.overview}
                            </p>
                        </div>
                        <div className="px-6 py-4">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{serie.tags}</span>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}