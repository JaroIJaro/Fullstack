
const mongoose = require('mongoose')
require('dotenv').config()




const url = process.env.MONGODB_URI 

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })
     .then(result => {   
    console.log('connected to MongoDB')
    })  
    .catch(error => {    
    console.log('error connecting to MongoDB:', error.message)  
})

const noteSchema = new mongoose.Schema({
  name: String,
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        // Check if number has exactly one dash
        const parts = v.split('-')
        if (parts.length !== 2) {
          return false
        }
        
        const [firstPart, secondPart] = parts
        
        // First part must be 2 or 3 digits
        if (!/^\d{2,3}$/.test(firstPart)) {
          return false
        }
        
        // Second part must be all digits
        if (!/^\d+$/.test(secondPart)) {
          return false
        }
        
        // Total length must be 8 or more (including the dash)
        return v.length >= 8
      },
      message: props => `${props.value} is not a valid phone number! Phone number must have length of 8 or more, be formed of two parts separated by -, the first part has two or three numbers and the second part also consists of numbers (e.g., 09-1234556 or 040-22334455)`
    },
    required: true
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)