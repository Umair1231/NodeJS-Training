import React from 'react'
import { NavLink } from 'react-router-dom'

export default function HomeView() {
  return (
    <div>
      <button><NavLink to={'/login'}>Login</NavLink></button>
      <button><NavLink to={'/register'}>Register</NavLink></button>
    </div>
  )
}
