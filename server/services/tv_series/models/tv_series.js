const db = require('../configs/ mongodb')
const TVCollection = process.env.DB_COLLECTION_TV_SERIES
const TVSeries = db.collection(TVCollection)
const { ObjectId } = require('mongodb')

class TVSeriesModel {

    static find() {
        return TVSeries.find().toArray()
    }

    static create(newData) {
        return TVSeries.insertOne(newData)
    }

    static getById(id) {
        return TVSeries.findOne({ _id: ObjectId(id) })
    }

    static updateById(id, updatedData) {
        return TVSeries.updateOne({ _id: ObjectId(id) }, { $set: updatedData })
    }

    static removeById(id) {
        return TVSeries.deleteOne({ _id: ObjectId(id) })
    }

}

module.exports = TVSeriesModel