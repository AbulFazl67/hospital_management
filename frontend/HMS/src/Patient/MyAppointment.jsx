import React, { useEffect, useState } from 'react';
import './pat-dashboard.css';
import { Link } from 'react-router-dom';

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`http://localhost:3000/getPatientsAppointment/${userId}`);
      const data = await res.json();

      if (data.status === 200) {
        setAppointments(data.msg);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const res = await fetch('http://localhost:3000/appointment', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: appointmentId }),
      });

      if (res.ok) {
        fetchAppointments(); // Refresh the list after successful delete
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  useEffect(() => {
    if (userId) fetchAppointments();
  }, [userId]);

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
        <h2>My Appointments</h2>
        <div className="doctor-table-container">
          {loading ? (
            <p>Loading...</p>
          ) : appointments?.length > 0 ? (
            <table className="doctor-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor ID</th>
                  <th>Appointment Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={appt.appointment_id}>
                    <td>{index + 1}</td>
                    <td>{appt.doctor_id}</td>
                    <td>{new Date(appt.appointment_datetime).toLocaleString()}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteAppointment(appt.appointment_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Appointments Found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyAppointment;
