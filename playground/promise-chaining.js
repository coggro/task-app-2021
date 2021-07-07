import User from '../src/models/user.js'

// User.findByIdAndUpdate(`60df447cafd67319b93f897e`, { age: 1 })
//   .then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
//   })
//   .then((count) => {
//     console.log(count)
//   })
//   .catch((e) => {
//     console.log(e)
//   })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount(`60df447cafd67319b93f897e`, 2)
  .then((count) => {
    console.log(count)
  })
  .catch((e) => {
    console.log(e)
  })
