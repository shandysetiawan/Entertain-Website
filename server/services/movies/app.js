require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)

app.listen(PORT, () => console.log(`Movies app listening at http://localhost:${PORT}`))
