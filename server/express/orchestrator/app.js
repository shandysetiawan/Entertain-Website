const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)

app.listen(PORT, () => console.log(`Orchestrator app listening at http://localhost:${PORT}`))
