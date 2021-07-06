import mongodb from 'mongodb'
const { MongoClient, ObjectID } = mongodb

const connectionURL = `mongodb://127.0.0.1:27017`,
  databaseName = `task-manager`

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err)
      return console.log(`Unable to connect to database`)
    }

    const db = client.db(databaseName)
    // db.collection(`users`)
    //   .deleteMany({ age: 31 })
    //   .then((result) => {
    //     console.log(result)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    db.collection(`tasks`)
      .deleteOne({ description: `Take out the trash` })
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
)
