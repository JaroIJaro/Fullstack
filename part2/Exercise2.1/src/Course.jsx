const Course = ({course}) => {
  


  const Header = () => {
    return (
    <h1> {course.name} </h1> 
    )} 
    
  const Part = ({name, exercises}) =>
  <li> {name} {exercises} </li>

  const Content = ({parts}) => {
    return (
  <ul> 
    {parts.map(part => <Part key ={part.id} name= {part.name} exercises={part.exercises} />  
    )}
  </ul> 
    )} 



  const Total = ({parts}) => {
    return (
    <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0) }</p>
  )} 

  return (
      <div>
      <Header course = {course}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}
export default Course