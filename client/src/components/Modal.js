import React, { useState, forwardRef, useImperativeHandle } from "react";
import { gql, useMutation } from '@apollo/client'
import { GET_MOVIE } from '../pages/movieDetail'


const EDIT_MOVIE = gql`
mutation editone($id: String, $movie:InputMovie){
    editMovie(id: $id, movie:$movie){
 status
    }
}
`

const Modal = forwardRef((props, ref) => {
    const [movieTitle, setTitle] = useState("")
    const [movieOverview, setOverview] = useState("")
    const [moviePopularity, setPopularity] = useState("")
    const [movieTags, setTags] = useState("")
    const [moviePoster, setPoster] = useState("")
    const [editMovie, { data, error }] = useMutation(EDIT_MOVIE,
        {
            refetchQueries: [{ query: GET_MOVIE, variables: { _id: props.movie.getMovie._id } }],
            onCompleted: () => { hideForm() }
        });

    const [showModal, setShowModal] = useState(false);

    const showForm = () => {
        setTitle(props.movie.getMovie.title);
        setOverview(props.movie.getMovie.overview);
        setPopularity(props.movie.getMovie.popularity);
        setTags(props.movie.getMovie.tags);
        setPoster(props.movie.getMovie.poster_path)
        setShowModal(true);
    };

    const hideForm = (e) => {
        // e.preventDefault()
        setShowModal(false);
    };


    useImperativeHandle(ref, () => {
        return {
            showForm: showForm
        };
    });

    function handleSubmit(event) {
        event.preventDefault()

        const editData = {
            title: movieTitle,
            overview: movieOverview,
            poster_path: moviePoster,
            popularity: moviePopularity,
            tags: movieTags
        }
        const id = props.movie.getMovie._id

        // console.log(await editMovie())
        editMovie({
            variables: {
                movie: editData,
                id: id
            },
        })

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
                                        <div className="flex flex-wrap -mx-3 mb-6" style={{ marginLeft: "25%" }}>
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                                    Title
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" value={movieTitle} onChange={e => setTitle(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Overview
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={movieOverview} onChange={e => setOverview(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Poster Path
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" value={moviePoster} onChange={e => setOverview(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-2">
                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                    Tags
      </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" value={movieTags} onChange={e => setTags(e.target.value)} />
                                            </div>

                                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0" style={{ marginLeft: "32%" }}>
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