const mongoose = require('mongoose')
const db_uri = 'mongodb://localhost:27017/test'

const initiateDB = async () => {
  try {
    return await mongoose.connect(db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (error) {
    return null
  }
}

module.exports = initiateDB
