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
      {starWars.length === 0 && <h3>Loading...</h3>}
      {starWars.map((star, index) => (
        <ul key={star.name}>
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
