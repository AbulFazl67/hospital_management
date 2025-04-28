import React, { useEffect, useState } from 'react';
import './Appointment.css';

const DocAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const doctorId = localStorage.getItem("userId");

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/get-doctors-patient/${doctorId}`);
        const data = await response.json();
        setAppointments(data.msg);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    if (doctorId) {
        console.warn(doctorId)
      fetchAppointments();
    }else{
      console.warn("doc api not called")
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <ul>
            <li>Home</li>
            <li>Appointments</li>
            <li>Patients</li>
          </ul>
        </nav>
      </div>
      <div className="main-content">
        <h2>My Appointments</h2>
        <div className="appointment-list">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div className="card" key={appointment.treatment_id}>
                <h3>{appointment.treatmentname}</h3>
                <p><strong>Date:</strong> {new Date(appointment.treatmetdate).toLocaleDateString()}</p>
                <p><strong>Patient ID:</strong> {appointment.patient_id}</p>
              </div>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocAppointment;
