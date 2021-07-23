import supertest from 'supertest'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import app from '../src/app.js'
import User from '../src/models/user.js'

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
  _id: userOneId,
  name: `Mike`,
  email: `mike@example.com`,
  password: `56what11`,
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
}

beforeEach(async () => {
  // delete all users
  await User.deleteMany()
  // create user to test logging in and such
  await new User(userOne).save()
})

test(`Should sign up a new user`, async () => {
  const response = await supertest(app)
    .post(`/users`)
    .send({
      name: `Andrew`,
      email: `andrew@example.com`,
      password: `MyPass777!`,
    })
    .expect(201)

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response
  // expect(response.body.user.name).toBe(`Andrew`)
  expect(response.body).toMatchObject({
    user: {
      name: `Andrew`,
      email: `andrew@example.com`,
    },
    token: user.tokens[0].token,
  })

  // Make sure that plaintext passwords don't go to the db
  expect(user.password).not.toBe(`MyPass777!`)
})

test(`Should log in existing user`, async () => {
  const response = await supertest(app)
    .post(`/users/login`)
    .send({ email: userOne.email, password: userOne.password })
    .expect(200)
  // Get the user by the ID we made (this ID wasn't sent in login request)
  const user = await User.findById(userOneId)
  // We then compare the user we got from email/password to the one we got with
  // the direct lookup in the db
  expect(response.body.token).toBe(user.tokens[1].token)
})

test(`Should not log in nonexistent user`, async () => {
  await supertest(app)
    .post(`/users/login`)
    .send({ email: `zzz`, password: 12 })
    .expect(400)
})

test(`Should get profile for user`, async () => {
  await supertest(app)
    .get(`/users/me`)
    .set(`Authorization`, `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test(`Should not get profile for unauthenticated user`, async () => {
  await supertest(app).get(`/users/me`).send().expect(401)
})

test(`Should delete account for user`, async () => {
  await supertest(app)
    .delete(`/users/me`)
    .set(`Authorization`, `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test(`Should not delete account for unauthorized user`, async () => {
  await supertest(app).delete(`/users/me`).send().expect(401)
})
