import mongoose from 'mongoose'

import db from '../db/mongoose.js'

const Task = db.model(`Task`, {
  description: {
    required: true,
    trim: true,
    type: String,
  },
  completed: {
    default: false,
    type: Boolean,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: `User`,
  },
})

export default Task
