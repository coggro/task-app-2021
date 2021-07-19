import express from 'express'

import userRouter from '../src/routers/user.js'
import taskRouter from '../src/routers/task.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})
