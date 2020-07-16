const db = require('../configs/mongodb')
const movieCollection = process.env.DB_COLLECTION_MOVIES
const Movie = db.collection(movieCollection)
const { ObjectId } = require('mongodb')

class MovieModel {

    static find() {
        return Movie.find().toArray()
    }

    static create(newData) {
        return Movie.insertOne(newData)
    }

    static getById(id) {
        return Movie.findOne({ _id: ObjectId(id) })
    }

    static updateById(id, updatedData) {
        return Movie.updateOne({ _id: ObjectId(id) }, { $set: updatedData })
    }

    static removeById(id) {
        return Movie.deleteOne({ _id: ObjectId(id) })
    }

}

module.exports = MovieModel