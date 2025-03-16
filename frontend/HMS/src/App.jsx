import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Home from './Main/Home'
import Header from './Main/Header'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="*" element={<h1>Page Not Found</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
