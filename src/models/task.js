import mongoose from 'mongoose'

import db from '../db/mongoose.js'

const taskSchema = new mongoose.Schema({
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
}, {
  timestamps: true
})

const Task = db.model(`Task`, taskSchema)

export default Task
