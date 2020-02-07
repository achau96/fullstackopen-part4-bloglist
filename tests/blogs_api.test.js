const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog id parameter is labelled correctly', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const firstBlog = blogsAtStart[0]

  expect(firstBlog.id).toBeDefined()
})

test('blogs are posted correctly', async () => {
  const newBlog = {
    title: 'Nice one',
    author: 'AusBoss',
    url: 'https://AusBossIsBest.com/',
    likes: 3
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  
  const blogsAtEnd = await helper.blogsInDb()
  //const contents = response.body.map(r => r.title)

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
})

test('likes is equal to 0 if parameter is missing', async () =>{
  const newBlog = {
    title: 'Nice one',
    author: 'AusBoss',
    url: 'https://AusBossIsBest.com/',
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0) 
})
//Git Bash cmd : npx jest tests/blogs_api.test.js --runInBand

afterAll(() => {
  mongoose.connection.close()
})