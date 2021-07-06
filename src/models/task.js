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
})

export default Task
