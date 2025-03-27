import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Dashboard from "./Patient/pat-dashboard";
 
const App = () => {
  return (
    <>
    <BrowserRouter> 
    <Routes>
    <Route path="*" element={<h1>Page Not Found</h1>} />
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/doctor/dashboard" element={<Register />} />
      <Route path="/patient/dashboard" element={<Dashboard />} />
    </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
