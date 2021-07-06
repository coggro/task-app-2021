import mongoose from 'mongoose'
import validator from 'validator'

import db from '../db/mongoose.js'

const User = db.model(`User`, {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    default: 0,
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error(`Age must be a positive number`)
      }
    },
  },
  email: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`Email is invalid`)
      }
    },
  },
  password: {
    minlength: 7,
    required: true,
    trim: true,
    type: String,
    validate(value) {
      if (value.toLowerCase().includes(`password`)) {
        throw new Error(`Password contains 'password'`)
      }
    },
  },
})

export default User
