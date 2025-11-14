const Results = ({ persons, newSearch }) => {

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
  )

  return (
    <div>
      {filteredPersons.map((p, i) => (
        <div key={i}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  )
}

export default Results
