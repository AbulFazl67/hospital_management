import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import Dashboard from "./Patient/pat-dashboard";
import AdminDashboard from './Admin/adminDashboard';
import Doctors from './Admin/doctors';
import Patient from './Admin/patient';
import Appointment from './Admin/appointment';
import AddStaff from './Admin/AddStaff';
import Docdashboard from './Doctors/Docdashboard'
import ClerkDashboard from './Clerk/ClerkDashboard';

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
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/doctors" element={<Doctors />} />
      <Route path="/admin/patient" element={<Patient />} />
      <Route path="/admin/appointment" element={<Appointment />} />
      <Route path="/admin/addStaff" element={<AddStaff />} />
      <Route path="/doctors/dashboard" element={<Docdashboard />} />
      <Route path="/clerk/dashboard" element={<ClerkDashboard />} />
    </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
