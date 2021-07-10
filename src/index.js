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

import jsonwebtoken from 'jsonwebtoken'

const demoFunction = async () => {
  const secret = `dactyl-hedgehog-columnar-bane-alleyway-finish-outclass-fructify`
  const token = jsonwebtoken.sign({ _id: `abc123` }, secret, {
    expiresIn: `7 days`,
  })
  // console.log(token)

  const data = jsonwebtoken.verify(token, secret)
  // console.log(data)
}

demoFunction()
