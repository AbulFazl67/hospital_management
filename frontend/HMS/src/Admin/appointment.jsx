
import React, { useEffect, useState } from 'react';
import './admin-doctor.css'
const Appointment = () => {
 const [doctors, setDoctors] = useState([""]);
    console.warn("api called")
    useEffect(() => {
      fetch('http://localhost:3000/getAllAppointment')
        .then(res => res.json())
        .then(data => {
    
            setDoctors(data.result)
        })
        .catch(err => console.error("Error fetching patient:", err));
    }, []);
    console.warn(doctors)
  
    return (
      <div className="doctor-table-container">
        <h2 className="table-heading">Appointment List</h2>
        <table className="doctor-table">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient Name</th>
              <th>Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.appointment_id}>
                <td>{doc.appointment_id}</td>
                <td>{doc.patient_name}</td>
                <td>{doc.appointment_datetime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default Appointment