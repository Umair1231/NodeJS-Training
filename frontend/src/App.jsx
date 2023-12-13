import './App.css'
import StarWarsView from './components/StarWarsView'
import { Route, Routes } from 'react-router-dom'
import HomeView from './components/HomeView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='starwars' element={<StarWarsView />} />
        <Route path='login' element={<LoginView />} />
        <Route path='register' element={<RegisterView />} />
      </Routes>
    </div>
  )
}

export default App
