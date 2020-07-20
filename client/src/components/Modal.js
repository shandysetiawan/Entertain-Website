import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useHistory, Link } from "react-router-dom";
import { gql, useMutation } from '@apollo/client'
import { GET_MOVIE } from '../pages/movieDetail'


const EDIT_MOVIE = gql`
mutation EditMovie($id: String, $updateMovie:InputMovie){
    editMovie(id: $id, movie:$updateMovie){
status
    }
}
`

const Modal = forwardRef((props, ref) => {
    const history = useHistory()
    const [movieTitle, setTitle] = useState("")
    const [movieOverview, setOverview] = useState("")
    const [moviePopularity, setPopularity] = useState("")
    const [movieTags, setTags] = useState("")
    const [moviePoster, setPoster] = useState("")
    const [editMovie, { data }] = useMutation(EDIT_MOVIE, { refetchQueries: [{ query: GET_MOVIE }] });

    const [showModal, setShowModal] = useState(false);

    const showForm = () => {
        setTitle(props.movie.getMovie.title);
        setOverview(props.movie.getMovie.overview);
        setPopularity(props.movie.getMovie.popularity);
        setTags(props.movie.getMovie.popularity);
        setPoster(props.movie.getMovie.poster_path)
        setShowModal(true);
    };

    const hideForm = () => {
        setShowModal(false);
    };


    useImperativeHandle(ref, () => {
        return {
            showForm: showForm
        };
    });

    async function handleSubmit(event) {
        event.preventDefault()

        const editData = {
            title: movieTitle,
            overview: movieOverview,
            popularity: moviePopularity,
            poster_path: moviePoster,
            tags: movieTags
        }
        const id = props.movie.getMovie._id
        console.log(editData)
        console.log(id)
        console.log(await editMovie())
        editMovie({
            variables: {
                updateMovie: editData,
                id: id
            },
        })

        history.push('/movies')
    }


    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Update Movie
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={hideForm}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                                    Title
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" value={movieTitle} onChange={e => setTitle(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Overview
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={movieOverview} onChange={e => setOverview(e.target.value)} />
                                                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Tags
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" value={movieTags} onChange={e => setTags(e.target.value)} />
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Poster Path
      </label>
                                                <div className="relative">
                                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={moviePoster} onChange={e => setPoster(e.target.value)}>
                                                        <option>New Mexico</option>
                                                        <option>Missouri</option>
                                                        <option>Texas</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Popularity
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" value={moviePopularity} onChange={e => setPopularity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                                onClick={hideForm}
                                            >
                                                Cancel
                  </button>
                                            <button
                                                className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="submit"
                                                style={{ transition: "all .15s ease" }}
                                            // onClick={hideForm}
                                            >
                                                Update
                  </button>
                                        </div>

                                    </form>
                                </div>
                                {/*footer*/}

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
)

export default Modal;