const db = require('../configs/mongodb')

const executed = (db, callback) => {
    console.log('kesini')
    db.createCollection("contacts",
        {
            'validator': {
                '$or':
                    [
                        { 'phone': { '$type': "string" } },
                        { 'email': { '$regex': /@mongodb\.com$/ } },
                        { 'status': { '$in': ["Unknown", "Incomplete"] } }
                    ]
            }
        },
        function (err, results) {
            console.log("Collection created.");
            callback(results, err);
        }
    );
};
executed(db, (result, err) => {
    console.log(result)
    console.log(err)

})
// process.exit()