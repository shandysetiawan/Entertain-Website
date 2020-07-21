require('dotenv').config()
const db = require('../configs/mongodb')
console.log(db)

db.createCollection("Movies", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "overview", "poster_path", "popularity", "tags"],
            properties: {
                title: {
                    bsonType: "string",
                    description: "title must be a string",
                },
                overview: {
                    bsonType: "string",
                    description: "overview must be a string",
                },
                poster_path: {
                    bsonType: "string",
                    description: "poster_path must be a string",
                },
                popularity: {
                    bsonType: ["double"],
                    description: "popularity must be a double",
                },
                tags: {
                    bsonType: ["array", "string"],
                    description: "tags must be an array of string",
                },
            },
        },
    },
});