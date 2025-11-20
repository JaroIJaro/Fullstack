const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())


let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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
          response.status(204).end()
}
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/info', (request, response) => {
  response.json( ` Phonebook has info for ${notes.length} people
     ${new Date()}`  )
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if (!note.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }
   const nameExists = notes.some(entry => entry.name === note.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
    note.id = String(Math.floor(Math.random()*100))
  notes.push(note)
  response.json(note)})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

