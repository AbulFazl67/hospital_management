import React, { useState } from "react";
import './dashboard.css'
const Dashboard = () => {
  const [appointmentList, setAppointmentList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAppointments = async () => {
    setLoading(true);
    setError("");
    setAppointmentList(null);

    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `http://localhost:3000/getPatientsAppointment/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json(); // ✅ `await` lagana zaroori hai!

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

  return (
    <div className="dashboard-container">
      <h1>Patient Dashboard</h1>
      <button onClick={getAppointments} className="fetch-btn">
        {loading ? "Loading..." : "Get All Appointments"}
      </button>

      {error && <p className="error">{error}</p>}

      {appointmentList === null ? (
        <p className="info">Click the button to load appointments.</p>
      ) : appointmentList.length === 0 ? (
        <p className="no-data">No Appointments Found.</p>
      ) : (
        <table className="appointment-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointmentList.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patientName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;