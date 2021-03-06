import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import mongoose from 'mongoose'
import validator from 'validator'

import Task from './task.js'
import db from '../db/mongoose.js'

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.virtual(`tasks`, {
  ref: `Task`,
  localField: `_id`,
  foreignField: `owner`,
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const secret = process.env.JWT_SECRET
  const token = jsonwebtoken.sign({ _id: user.id.toString() }, secret)

  // Add the token to the tokens array
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error(`Unable to login`)
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error(`Unable to login`)
  }

  return user
}

// Hash the plaintext password before saving
userSchema.pre(`save`, async function (next) {
  const user = this

  if (user.isModified(`password`)) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

// Delete user tasks when user is removed
userSchema.pre(`remove`, async function (next) {
  const user = this

  await Task.deleteMany({ owner: user._id })

  next()
})

const User = db.model(`User`, userSchema)

export default User
