
import React, { useEffect, useState } from 'react';
import './admin-doctor.css'
const patient = () => {
 const [doctors, setDoctors] = useState([""]);

    useEffect(() => {
      fetch('http://localhost:3000/get-patient')
        .then(res => res.json())
        .then(data => setDoctors(data.msg))
        .catch(err => console.error("Error fetching patient:", err));
    }, []);
  
    return (
      <div className="doctor-table-container">
        <h2 className="table-heading">Patient List</h2>
        <table className="doctor-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.user_id}>
                <td>{doc.user_id}</td>
                <td>{doc.fullname}</td>
                <td>{doc.email}</td>
                <td>{doc.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default patient