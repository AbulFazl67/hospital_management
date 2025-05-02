import React, { useState, useEffect } from "react";
import './pat-dashboard.css';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAppointments = async () => {
    setLoading(true);
    setError("");
    setAppointmentList([]);

    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`http://localhost:3000/getPatientsAppointment/${userId}`);
      const data = await response.json();

      if (response.status === 200) {
        setAppointmentList(data.msg);
      } else if (response.status === 404) {
        setAppointmentList([]);
      }
    } catch (e) {
      setError("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  const getDoctors = async () => {
    setLoading(true);
    setError("");
    setDoctors([]);

    try {
      const response = await fetch(`http://localhost:3000/get-doctors`); // Adjust endpoint as necessary
      const data = await response.json();

      if (response.status === 200) {
        setDoctors(data.msg);
      } else if (response.status === 404) {
        setDoctors([]);
      }
    } catch (e) {
      setError("Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
    getDoctors();
  }, []);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>MHC</h2>
        <nav>
          <ul>
                      <li>Dashboard</li>
                                 <li><Link to="/patient/doctorList">Doctors</Link></li>
                                 <li><Link to="/patient/myAppointment">Appointments</Link></li>
                                 
                                 <li><Link to="/patient/myInvoice">Invoices</Link></li>
                                 <li>Contact Info</li>
                                 <li>Settings</li>
                    </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Dashboard</h1>
        {error && <p className="error-message">{error}</p>}
        <section className="doctors-section">
          <h2>Doctors</h2>
          <div className="card-container">
            {doctors.map((doctor, index) => (
              <div className="card" key={index}>
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <button>Get Appointment</button>
              </div>
            ))}
          </div>
        </section>
        <section className="appointments-section">
          <h2>Upcoming Appointments</h2>
          <div className="appointment-list">
            {appointmentList.map((appointment, index) => (
              <div className="appointment-item" key={index}>
                <p>{appointment.patient}</p>
                <p>Assigned to: {appointment.doctor}</p>
                <p>Date: {appointment.date} at {appointment.time}</p>
              </div>
            ))}
          </div>
        </section>
        <button className="view-all-button">View All</button>
      </main>
    </div>
  );
};

export default Dashboard;