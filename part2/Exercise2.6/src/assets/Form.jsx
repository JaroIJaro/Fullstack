 import React from "react"
 
 const Form = ({addName, newName, handleChangename, newNumber, handleChangenumber}) => {
    return(
 <form onSubmit= {addName}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleChangename} 
            />
          </div>
          <div>
            number: <input 
            value={newNumber} 
            onChange={handleChangenumber} 
            />
          </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      )
  }


  export default Form