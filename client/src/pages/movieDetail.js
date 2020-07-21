import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import { useParams, useHistory, Link } from "react-router-dom";
import { gql, useQuery, useMutation } from '@apollo/client'
import { GET_MOVIES } from './Movies'
import Modal from '../components/Modal'
import Swal from 'sweetalert2'

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

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this imaginary file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                Swal.fire(
                    'Deleted!',
                    'Your imaginary file has been deleted.',
                    'success'
                )
                removeMovie({
                    variables: {
                        id: id
                    },
                })
                history.push('/movies')

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })



    }

    const handleClick = () => {
        ref.current.showForm();
    };


    if (loading) return <>Loading......</>
    if (error) return <>{JSON.stringify(error)}</>

    return (<>
        <Navbar />
        <Link to={`/movies`}>
            <button
                className="mt-5 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
            >
                Go Back
      </button>
        </Link>
        <div className="md:flex shadow-lg mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64">
            <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={movie.getMovie.poster_path} alt="bag" />
            <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                <div className="flex items-center">
                    <h2 className="text-xl text-gray-800 font-medium mr-auto">{movie.getMovie.title}</h2>
                    <p className="text-gray-800 font-semibold tracking-tighter">
                        Popularity
                    </p>
                    <p className="text-gray-800 font-semibold tracking-tighter">
                        {movie.getMovie.popularity}
                    </p>
                </div>
                <p className="text-sm text-gray-700 mt-4">
                    {movie.getMovie.overview}
                </p>
                <div className="flex items-center justify-end mt-4 top-auto">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-8">#{movie.getMovie.tags}</span>
                    <button className=" bg-gray-200 text-blue-600 px-2 py-2 rounded-md mr-2" onClick={handleClick}>Edit</button>
                    <Modal ref={ref} movie={movie}></Modal>
                    <button className=" bg-pink-500 text-gray-200 px-2 py-2 rounded-md" onClick={() => rmMovie(movie.getMovie._id)}>Delete</button>
                </div>
            </div>
        </div>

    </>)

}