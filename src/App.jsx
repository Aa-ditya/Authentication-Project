import React from 'react'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App