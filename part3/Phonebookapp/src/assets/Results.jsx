import Removebutton from "./Remove.jsx"
 
const Results = ({ persons, newSearch, deletePerson }) => {

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <div>
      {filteredPersons.map((p, i) => (
        <div key={p.id}>
          {p.name} {p.number} <Removebutton id={p.id} deletePerson={deletePerson}/>
        </div>
      ))}
    </div>
  )
}

export default Results
