import React, { useEffect, useState } from 'react';
import './pat-dashboard.css';
import { Link } from 'react-router-dom';

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-doctors');
        const data = await response.json();
        setDoctors(data.msg || []);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
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
        <h2>Doctor List</h2>
        <div className="doctor-table-container">
          <table className="doctor-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length > 0 ? (
                doctors.map((doctor, index) => (
                  <tr key={doctor.user_id}>
                    <td>{index + 1}</td>
                    <td>{doctor.fullname}</td>
                    <td>{doctor.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No doctors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DoctorsList;
