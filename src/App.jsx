import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home,  Login, Purchases, ProductDetail } from './pages'
import {LoadingScreen, NavBar} from './components'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'


function App() {
  const [count, setCount] = useState(0)
  // const isLoading = useSelector(state=>state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {/* { isLoading && <LoadingScreen />} */}
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/product/:id" element={< ProductDetail />} />
        <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
