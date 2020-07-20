import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import { useParams, useHistory, Link } from "react-router-dom";
import { gql, useQuery, useMutation } from '@apollo/client'
import { GET_MOVIES } from './Movies'
import Modal from '../components/Modal'

export const GET_MOVIE = gql`
query Movie($_id: String!){
    getMovie(id: $_id){
    _id
    title
    overview
    popularity
    poster_path
	tags
    }
}
`

const DELETE_MOVIE = gql`
mutation DelMovie($id: String!){
    removeMovie(id: $id){
        status
    }
}
`

export default function MovieDetail() {
    const ref = useRef(null);
    const history = useHistory()
    const param = useParams()
    const { loading, error, data: movie } = useQuery(GET_MOVIE, {
        variables: { _id: param.id },
    })
    const [removeMovie, { data }] = useMutation(DELETE_MOVIE, { refetchQueries: [{ query: GET_MOVIES }] });

    function rmMovie(id) {

        // console.log('rmmmmmm', id)
        removeMovie({
            variables: {
                id: id
            },
        })
        history.push('/movies')
    }

    const handleClick = () => {
        ref.current.showForm();
    };


    if (loading) return <>Loading......</>
    if (error) return <>{JSON.stringify(error)}</>

    return (<>
        <Navbar />
        {JSON.stringify(movie)}
        <div>
            <div>
                <div className="max-w-sm w-full lg:max-w-full lg:flex mt-5">
                    <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(/img/card-left.jpg)` }} title="Woman holding a mug">
                    </div>
                    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                                <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
        Members only
      </p>
                            <div className="text-gray-900 font-bold text-xl mb-2">{movie.getMovie.title}</div>
                            <p className="text-gray-700 text-base">{movie.getMovie.overview}</p>
                        </div>
                        <div className="flex items-center">
                            <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink" />
                            <div className="text-sm">
                                <button
                                    className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                    onClick={handleClick}
                                >
                                    Edit
      </button>
                                <Modal ref={ref} movie={movie}></Modal>
                                <button
                                    className="mt-5 bg-indigo-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: "all .15s ease" }}
                                    onClick={() => rmMovie(movie.getMovie._id)}
                                >
                                    Delete
      </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)

}