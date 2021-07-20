import mongoose from 'mongoose'

const db = mongoose.createConnection(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default db
