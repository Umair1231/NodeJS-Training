import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'



function App() {
  const [starWars, setStarWars] = useState([])
  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [editIndex, setEditIndex] = useState(-1)

  const getStarWars = async () => {
    const response = await axios.get('http://localhost:3000/starwars')
    setStarWars(response.data)
  }

  useEffect(() => {
    getStarWars();
  },[])
  
  const handleEdit = async (e, _id) => {
    e.preventDefault()
    setEditIndex(-1)
    setEditMode(false)
    try
    {
      const Editname = { name: editValue }
      const response = await axios.put(`http://localhost:3000/starwars/${_id}`, Editname)
      alert("Edited Succesfully")
      getStarWars()
    }
    catch(err)
    {
      alert("Not found")
    }
  }

  const handleDelete = async (_id) => {
    try
    {
      const response = await axios.delete(`http://localhost:3000/starwars/${_id}`)
      alert("Deleted Succesfully")
      getStarWars()
    }
    catch(err)
    {
      alert("Internal Server Error")
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name: name,
      birth_year: birthYear
    }
    try
    {
      const response = await axios.post(`http://localhost:3000/starwars`, formData)
      if (response.status === 201)
      {
        alert("Added Successfully")
        getStarWars()
      }
    }
    catch(err)
    {
      alert("Internal Server Error")
    }
  }

  return (
    <div>
      {starWars.length === 0 && <h3>Loading...</h3>}
      {starWars.map((star, index) => (
        <ul key={star._id}>
          <li>
            {star.name} <br/>
            {editMode && editIndex === index &&
            <form onSubmit={(e) => handleEdit(e, star._id)}>
              <input type='text' value={editValue} onChange={(e) => setEditValue(e.target.value)}/>
              <button type='submit'>Edit Value</button>
            </form>
            }
            {star.birth_year}
            <button onClick={ () => {setEditMode(true); setEditIndex(index)} }>Edit</button>
            <button onClick={ () => handleDelete(star._id) }>Delete</button>
          </li>
        </ul>
      ))}
      <form onSubmit={ handleFormSubmit }>
        <input type='text' onChange={ (e) => setName(e.target.value) }></input>
        <input type='text' onChange={ (e) => setBirthYear(e.target.value) }></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
