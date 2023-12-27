import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function RegisterView() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = {
      name: userName,
      email: email,
      password: password
    }
    
    const response = await axios.post(`http://localhost:3000/.netlify/functions/api/auth/register`, formData)
    if(response.status === 201)
    {
      navigate('/login')
    }
    else
    {
      alert(response.data.message)
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Email</label>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <br/>
      <label>Username</label>
      <input type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
      <br/>
      <label>Password</label>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br/>
      <button type='submit'>Submit</button>
    </form>
  )
}
