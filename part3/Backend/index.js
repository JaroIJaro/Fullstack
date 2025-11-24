const express = require('express')
const path = require('path')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const Note = require('./models/note')


morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('dist'))


app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
    if (note) {
          response.json(note)  
        } else {
          response.status(404).end()
}
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(404).end()
})

app.patch('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = request.body
  const noteIndex = notes.findIndex(n => n.id === id)
  
  if (noteIndex === -1) {
    return response.status(404).json({ error: 'note not found' })
  }
  
  notes[noteIndex] = { ...notes[noteIndex], ...note }
  response.json(notes[noteIndex])
})

app.get('/api/notes', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.get('/api/info', (request, response) => {
  response.json( ` Phonebook has info for ${notes.length} people
     ${new Date()}`  )
})

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }
   const nameExists = body.some(entry => entry.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
    body.id = String(Math.floor(Math.random()*100))
  notes.push(body)
  response.json(body)


  const note = new Note({
  name: process.argv[3],
  number: process.argv[4],
})

    note.save().then(savedNote => {
    response.json(savedNote)
  })
})

// Catch-all handler: send back React's index.html file for client-side routing
// This should be last, after all API routes and static file serving
// Use a middleware function instead of wildcard route for Express 5 compatibility
app.use((request, response, next) => {
  // Skip if it's an API route
  if (request.path.startsWith('/api')) {
    return next()
  }
  // For all other GET requests, serve index.html for SPA routing
  if (request.method === 'GET') {
    response.sendFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    next()
  }
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

