import './App.css'
import StarWarsView from './components/StarWarsView'
import { Route, Routes } from 'react-router-dom'
import HomeView from './components/HomeView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'


function App() {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<HomeView />} />
          <Route path='starwars' element={<StarWarsView />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path='login' element={<LoginView />} />
          <Route path='register' element={<RegisterView />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
