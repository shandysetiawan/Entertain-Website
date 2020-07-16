const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = process.env.DATABASE_NAME
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

function connect(callback) {
    client.connect((err) => {
        if (err) {
            console.log('err')
        } else {
            console.log('successfully connect to mongodb')
            db = client.db(dbName)
        }
        callback(err)
    })
}

function getDatabase() {
    return db
}

module.exports = { connect, getDatabase }