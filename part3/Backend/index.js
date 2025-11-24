const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const Note = require('./models/note')
const { error } = require('console')


morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))

app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then((notes) => response.json(notes))
    .catch(next)
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end()
      }
      response.json(note)
    })
    .catch(next)
})

app.post('/api/notes', (request, response, next) => {
  const { name, number } = request.body

  Note.findOne({ name })
    .then((existing) => {
      if (existing) {
        return response.status(400).json({ error: 'name must be unique' })
      }

      const note = new Note({ name, number })
      return note.save()
    })
    .then((savedNote) => {
      if (savedNote) {
        response.status(201).json(savedNote)
      }
    })
    .catch(error => next(error))
})

app.patch('/api/notes/:id', (request, response, next) => {
  const { name, number } = request.body
  const update = {}

  if (name !== undefined) update.name = name
  if (number !== undefined) update.number = number

  Note.findByIdAndUpdate(request.params.id, update, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      if (!updatedNote) {
        return response.status(404).json({ error: 'note not found' })
      }
      response.json(updatedNote)
    })
    .catch(next)
})

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((deletedNote) => {
      if (!deletedNote) {
        return response.status(404).json({ error: 'note not found' })
      }
      response.status(204).end()
    })
    .catch(next)
})

app.get('/api/info', (request, response, next) => {
  Note.countDocuments({})
    .then((count) => {
      response.send(`Phonebook has info for ${count} people<br>${new Date()}`)
    })
    .catch(next)
})

app.use((request, response, next) => {
  if (request.path.startsWith('/api')) {
    return next()
  }

  if (request.method === 'GET') {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    next()
  }
})

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  console.error(error)
  return response.status(500).send({ error: 'internal server error' })
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

