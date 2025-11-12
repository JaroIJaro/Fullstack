import { useState } from 'react'

  const Button = ({text, handle}) => (
    <button onClick={handle}> {text} </button>
  )

  const StatisticLine = ({text, value}) =>(
      <tr>
        <td> {text} {value}</td>
      </tr> )


  const Statistics = ({good, bad, total, neutral}) => {
    const average = () => ((good*1+bad*(-1))/total)
    const positive = () => ((good/total)*100)
   


    if (total === 0) {
      return  <p>No feedback given </p>
    }
    return (
      <div>
    <StatisticLine text= "good" value= {good}/>
    <StatisticLine text= "neutral" value= {neutral}/>
    <StatisticLine text= "bad" value= {bad}/>
    <StatisticLine text= "total" value= {total}/>
    <StatisticLine text= "average" value= {average ()}/>
    <StatisticLine text= "positive" value= {positive ()}/>

    </div>
    )
  }
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState (0)

  const handleGood = () =>{
    setGood (good+1)
    setTotal (good+bad+neutral+1)
  }
  
    const handleBad = () =>{
    setBad (bad+1)
    setTotal (good+bad+neutral+1)
  }
  
    const handleNeutral = () =>{
    setNeutral (neutral+1)
    setTotal (good+bad+neutral+1)
  }
  

  return (
    <div>
      <h1> give feedback </h1>
      <Button text="good" handle={handleGood}/>
      <Button text="bad" handle={handleBad}/>
      <Button text="neutral" handle={handleNeutral}/>
      <h1>statistics</h1>
      <Statistics good={good} total={total} bad={bad} neutral = {neutral} />

    </div>

    
  )
}

export default App