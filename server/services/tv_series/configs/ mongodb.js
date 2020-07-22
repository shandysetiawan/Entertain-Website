const { MongoClient } = require('mongodb')
const url = 'mongodb://mongo:27017'
const dbName = process.env.DATABASE_NAME
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect()

const db = client.db(dbName)

module.exports = db