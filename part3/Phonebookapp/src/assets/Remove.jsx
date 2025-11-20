
const Removebutton = ({id, deletePerson}) => {
  return ( 
    <button onClick={() => deletePerson(id)}>Delete</button>
  )
}

export default Removebutton
