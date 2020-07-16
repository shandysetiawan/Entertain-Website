require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3001
const database = require('./configs/mongodb')
const routes = require('./routes')
const cors = require('cors')

// database.connect((err) => {
//     if (!err) {
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)

app.listen(PORT, () => console.log(`Movies app listening at http://localhost:${PORT}`))

//     }
// })