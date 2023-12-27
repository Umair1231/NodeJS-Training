import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const formData = {
      email: email,
      password: password
    }
    const response = axios.post(`http://localhost:3000/.netlify/functions/api/auth/login`, {
      formData,
    }, {
      withCredentials: true,
    })
    response.then(result => {
      if(result.status === 201)
      {
        console.log("yo")
        navigate('/starwars')
      }
    })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>email</label>
      <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <label>Password</label>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type='submit'>Submit</button>
    </form>
  )
}
