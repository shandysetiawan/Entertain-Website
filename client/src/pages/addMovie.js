import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useHistory, Link } from "react-router-dom";

const ADD_MOVIE = gql`
mutation AddMovie($newMovie: InputMovie){
    addMovie(movie:$newMovie){
title
_id
    }
}
`


export default function AddMovie() {
    const history = useHistory()
    const [movieTitle, setTitle] = useState("")
    const [movieOverview, setOverview] = useState("")
    const [moviePopularity, setPopularity] = useState("")
    const [movieTags, setTags] = useState("")
    const [moviePoster, setPoster] = useState("")
    const [addMovie, { data, loading, error }] = useMutation(ADD_MOVIE);

    function handleSubmit(event) {
        event.preventDefault()

        const newData = {
            title: movieTitle,
            overview: movieOverview,
            popularity: moviePopularity,
            poster_path: moviePoster,
            tags: movieTags
        }
        console.log(newData)
        addMovie({
            variables: {
                newMovie: newData
            },
        })

        history.push('/movies')
    }

    if (error) return <>{JSON.stringify(error)}</>
    return (<>
        <Navbar />
        <div>
            <form class="w-full max-w-lg" onSubmit={handleSubmit}>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Title
      </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" onChange={e => setTitle(e.target.value)} />
                        <p class="text-red-500 text-xs italic">Please fill out this field.</p>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Overview
      </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" onChange={e => setOverview(e.target.value)} />
                        <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Tags
      </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" onChange={e => setTags(e.target.value)} />
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Poster Path
      </label>
                        <div class="relative">
                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" onChange={e => setPoster(e.target.value)}>
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                            Popularity
      </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" onChange={e => setPopularity(e.target.value)} />
                    </div>
                </div>
                <Link to={`/movies`}>
                    <button
                        className="mt-5 bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                    >
                        Cancel
      </button>
                </Link>
                <button
                    className="mt-5 bg-orange-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    style={{ transition: "all .15s ease" }}
                >
                    Create
      </button>
            </form>

        </div>

    </>)
}
