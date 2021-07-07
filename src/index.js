import express from 'express'

import User from './models/user.js'
import Task from './models/task.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post(`/users`, async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()

    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get(`/users`, async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send()
  }
})

app.get(`/users/:id`, (req, res) => {
  const _id = req.params.id
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.status(200).send(user)
    })
    .catch((e) => {
      res.status(500).send(e)
    })
})

app.post(`/tasks`, async (req, res) => {
  const task = new Task(req.body)
  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get(`/tasks`, async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (e) {
    res.status(500).send()
  }
})

app.get(`/tasks/:id`, async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findById(_id)
    if (!task) {
      return res.status(404).send()
    }
    res.status(200).send(task)
  } catch (e) {
    res.status(500).send()
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
