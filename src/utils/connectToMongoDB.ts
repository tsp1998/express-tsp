//@ts-nocheck
const mongoose = require('mongoose')

function connectToMongoDB(
  MONGO_DB_USER = process.env.MONGO_DB_USER,
  MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD,
  MONGO_DB_NAME = process.env.MONGO_DB_NAME
) {
  console.log('Connecting to Database')
  const connectionString = `
    mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@royaltsp.trbef.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority
  `
  // console.log(`connectionString`, connectionString)
  mongoose.connect(connectionString, (error) => {
    if (error) {
      return console.log(`Error while connecting to database: `, error)
    }
    console.log('Connected to Database')
  })
}

module.exports = connectToMongoDB