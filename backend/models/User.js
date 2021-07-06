const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchemaa = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  nonce: {
    require: true,
    default: () => Math.floor(Math.random() * 1000000).toString(),
    type: Number,
  },
  publicAddress: {
    require: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
})

const User = model('User', userSchemaa)

module.exports = User
