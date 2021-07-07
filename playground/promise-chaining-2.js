import Task from '../src/models/task.js'

// Task.findByIdAndDelete(`60e44f527450292a57116731`)
//   .then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
//   })
//   .then((count) => {
//     console.log(count)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount(`60e44ebd38b48f298e7ebfeb`)
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
console.log(`Immediately after function call`)
