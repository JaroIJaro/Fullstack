import { useState } from 'react'
import Form from './assets/Form.jsx'
import Results from './assets/Results.jsx'
import Searchfilter from './assets/Searchfilter.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  
  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState ('')


  const addName = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber}
    if (persons.some(person => person.name === newPerson.name) ){
      alert( newName + ' name already exists')
      console.log ('name exists alreasy')
    }
    else {
      setPersons (persons.concat(newPerson))
      setNewName ('')
      setNewNumber ('')
  
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
       <Form 
       addName={addName}
        newName={newName}
       handleChangename={handleChangename}
        newNumber={newNumber}
        handleChangenumber={handleChangenumber}/>
     
      <h2>Numbers</h2>
      <Results persons= {persons}
      newSearch= {newSearch} />
    
    </div>
  )
}

export default App