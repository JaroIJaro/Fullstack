


const mongoose = require('mongoose')



if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://full:${password}@fullstack.n0lbf1h.mongodb.net/?appName=Fullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length >= 3) {
note.save().then(result => {
  console.log(note)
  mongoose.connection.close()
})
}


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})