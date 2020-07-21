import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (<>
        <h1 style={{ textAlign: "center" }}>404 PAGE NOT FOUND</h1>
        <Link to="/">
            Back to Home
        </Link>
    </>)

}
