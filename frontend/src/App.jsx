import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [starWars, setStarWars] = useState([])

  useEffect(() => {
    const getStarWars = async () => {
      const response = await axios.get('http://localhost:3000')
      console.log(response.data)
      setStarWars(response.data)
    }
    getStarWars();
  },[])


  return (
    <div>
      {starWars.map((star) => (
        <ul>
          <li>
            {star.name} <br/>
            {star.birth_year}
          </li>

        </ul>
      ))}
    </div>
  )
}

export default App
