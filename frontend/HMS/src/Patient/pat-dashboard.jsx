// import React, { useState } from "react";
// import './pat-dashboard.css'
// const Dashboard = () => {
//   const [appointmentList, setAppointmentList] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const getAppointments = async () => {
//     setLoading(true);
//     setError("");
//     setAppointmentList(null);

//     const userId = localStorage.getItem("userId");
//     try {
//       const response = await fetch(
//         `http://localhost:3000/getPatientsAppointment/${userId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json(); // ✅ `await` lagana zaroori hai!

//       if (response.status === 200) {
//         setAppointmentList(data.msg);
//       } else if (response.status === 404) {
//         setAppointmentList([]);
//       }
//     } catch (e) {
//       setError("Failed to fetch appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h1>Patient Dashboard</h1>
//       <button onClick={getAppointments} className="fetch-btn">
//         {loading ? "Loading..." : "Get All Appointments"}
//       </button>

//       {error && <p className="error">{error}</p>}

//       {appointmentList === null ? (
//         <p className="info">Click the button to load appointments.</p>
//       ) : appointmentList.length === 0 ? (
//         <p className="no-data">No Appointments Found.</p>
//       ) : (
//         <table className="appointment-table">
//           <thead>
//             <tr>
//               <th>Patient Name</th>
//               <th>Doctor</th>
//               <th>Date</th>
//               <th>Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointmentList.map((appointment, index) => (
//               <tr key={index}>
//                 <td>{appointment.patientName}</td>
//                 <td>{appointment.doctorName}</td>
//                 <td>{appointment.date}</td>
//                 <td>{appointment.time}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import './pat-dashboard.css';

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
      const response = await fetch(`http://localhost:3000/getDoctors`); // Adjust endpoint as necessary
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
            <li>Doctors</li>
            <li>Clerks</li>
            <li>Patients Info</li>
            <li>Appointments</li>
            <li>Tests</li>
            <li>Invoices</li>
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