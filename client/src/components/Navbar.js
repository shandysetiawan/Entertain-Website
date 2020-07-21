import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {


    return (
        <nav className="flex items-center justify-around flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
                <span className="font-semibold text-xl tracking-tight">ENTERTAIN ME</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow justify-around">
                <div className="text-xl lg:flex-grow ">
                    <NavLink className="mr-5" exact to='/' activeStyle={{
                        fontWeight: "bold",
                        color: "indigo"
                    }}>
                        Home
                    </NavLink>
                    <NavLink className="mr-5" exact to='/movies' activeStyle={{
                        fontWeight: "bold",
                        color: "indigo"
                    }}>
                        Movies
                    </NavLink >
                    <NavLink className="mr-5" exact to='/tv-series' activeStyle={{
                        fontWeight: "bold",
                        color: "indigo"
                    }}>
                        TV Series
                    </NavLink>
                    <NavLink exact to='/movies/favMovies' activeStyle={{
                        fontWeight: "bold",
                        color: "indigo"
                    }}>
                        Favorite Movies
                    </NavLink>

                </div>
                <div>
                </div>
            </div>
        </nav>
    )
}