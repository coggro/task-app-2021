import express from 'express'

import User from './models/user.js'
import Task from './models/task.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post(`/users`, (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then(() => {
      res.status(201).send(user)
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})

app.get(`/users`, (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users)
    })
    .catch((e) => {
      res.status(500).send()
    })
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

app.post(`/tasks`, (req, res) => {
  const task = new Task(req.body)
  task
    .save()
    .then(() => {
      res.status(201).send(task)
    })
    .catch((e) => {
      res.status(400).send(e)
    })
})

app.get(`/tasks`, (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(200).send(tasks)
    })
    .catch((e) => {
      res.status(500).send()
    })
})

app.get(`/tasks/:id`, (req, res) => {
  const _id = req.params.id
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }
      res.status(200).send(task)
    })
    .catch((e) => {
      res.status(500).send()
    })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
