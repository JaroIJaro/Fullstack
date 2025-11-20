import { useState,useEffect } from 'react'
import Form from './assets/Form.jsx'
import Results from './assets/Results.jsx'
import Searchfilter from './assets/Searchfilter.jsx'
import personService from './services/notes.js' 
import Notification from './components/Notification'
import FNotification from './components/FNotification.jsx'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState ('')
  const [successMessage, setSuccessMessage] = useState('')
  const [failMessage, setFailMessage] = useState('')

  useEffect(() => {
    personService      
    .getAll()      
    .then(response => {        
      setPersons(response)      
    })  }, [])

    
    
  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    
    const existingPerson = persons.find(p => p.name === newPerson.name)

    if (existingPerson) {
      if (window.confirm(`Replace phone number of ${newPerson.name}?`)) {
    personService
      .update(existingPerson.id, newPerson)
      .then(updated => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : updated))
            setSuccessMessage(`Updated ${newPerson.name}`)
            setTimeout(() => setSuccessMessage(null), 5000)
          })

      .catch(error => {
        setFailMessage( `${newPerson.name} was already deleted`)
        setTimeout(() => setFailMessage(null), 5000)
        setPersons(persons.filter(p => p.id !== existingPerson.id))               
      })
  }

    } else {
      personService.create(newPerson).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
    
      setSuccessMessage( `${newPerson.name} was added`)
      setTimeout(() => setSuccessMessage(null), 5000)
      })
    }
  }
  



const deletePerson = (id) => {
  const person = persons.find(p => p.id === id)

  if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })

}
}



  const handleSearch = (event) => {
    setNewSearch (event.target.value)
  }
  const handleChangename = (event) =>{
    setNewName (event.target.value)
  }  
    const handleChangenumber = (event) =>{
    setNewNumber (event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        <Searchfilter newSearch= {newSearch}
                   handleSearch = {handleSearch} />
      </form>

       <h2>Add New</h2>
       <Notification message = {successMessage}/>
       <FNotification message = {failMessage}/>
       <Form 
       addName={addName}
        newName={newName}
       handleChangename={handleChangename}
        newNumber={newNumber}
        handleChangenumber={handleChangenumber}/>
     
      <h2>Numbers</h2>
      <Results persons= {persons}
      newSearch= {newSearch}
      deletePerson={deletePerson} />
    
    </div>
  )
}

export default App