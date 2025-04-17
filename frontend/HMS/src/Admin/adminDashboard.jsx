import React from 'react'
import './admin-dash.css'
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className="leftSide">
        <ul className="menu-items">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/doctors">Doctors</Link></li>
          <li><Link to="/admin/patient">Patient</Link></li>
          <li><Link to="/admin/appointment">Appointment</Link></li>
          <li><Link to="/admin/addStaff">Add Staff</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </div>

      <div className="rightSide">
        <div className="topRight">
          <div className="top">
            <b><p>Doctors</p></b>
            <a href="">See all</a>
          </div>
          <div className="bottom">
            <div className="doctorCard">
              <img src="/docimg.png" alt="" />
              <b className='Name'>Dr Mahevi Aasif</b>
              <p className='Name'>Cardiologist</p>
              <button>Get Appointments</button>
            </div>

            <div className="doctorCard">
              <img src="/docimg.png" alt="" />
              <b className='Name'>Dr Mahevi Aasif</b>
              <p className='Name'>Cardiologist</p>
              <button>Get Appointments</button>
            </div>

            <div className="doctorCard">
              <img src="/docimg.png" alt="" />
              <b className='Name'>Dr Mahevi Aasif</b>
              <p className='Name'>Cardiologist</p>
              <button>Get Appointments</button>
            </div>
            <div className="doctorCard">
              <img src="/docimg.png" alt="" />
              <b className='Name'>Dr Mahevi Aasif</b>
              <p className='Name'>Cardiologist</p>
              <button>Get Appointments</button>
            </div>
            <div className="doctorCard">
              <img src="/docimg.png" alt="" />
              <b className='Name'>Dr Mahevi Aasif</b>
              <p className='Name'>Cardiologist</p>
              <button>Get Appointments</button>
            </div>
          </div>
        </div>
        <div className="appointmentSection">
          <div className="top">
            <b><p>Upcoming Appointments</p></b>
            <a href="#">View all</a>
          </div>

          <div className="appointmentsList">

            <div className="appointmentCard">
              <img src="/docimg.png" alt="" />
              <b> Mr. Rajesh Verma</b>
              <p className="assign">Assigned to: <span>Dr. Mahevi Aasif</span></p>
              <p className="dept">Dept: Cardiology</p>
              <p>Angiography</p>
              <p>7th March, 2025<br />10:00am</p>
            </div>
            <div className="appointmentCard">
              <img src="/docimg.png" alt="" />
              <b>Mr. Rajesh Verma</b>
              <p className="assign">Assigned to: <span>Dr. Mahevi Aasif</span></p>
              <p className="dept">Dept: Cardiology</p>
              <p>Angiography</p>
              <p>7th March, 2025<br />10:00am</p>
            </div>
            <div className="appointmentCard">
              <img src="/docimg.png" alt="" />
              <b>Mr. Rajesh Verma</b>
              <p className="assign">Assigned to: <span>Dr. Mahevi Aasif</span></p>
              <p className="dept">Dept: Cardiology</p>
              <p>Angiography</p>
              <p>7th March, 2025<br />10:00am</p>
            </div>
            <div className="appointmentCard">
              <img src="/docimg.png" alt="" />
              <b>Mr. Rajesh Verma</b>
              <p className="assign">Assigned to: <span>Dr. Mahevi Aasif</span></p>
              <p className="dept">Dept: Cardiology</p>
              <p>Angiography</p>
              <p>7th March, 2025<br />10:00am</p>
            </div>
            <div className="appointmentCard">
              <img src="/docimg.png" alt="" />
              <b>Mr. Rajesh Verma</b>
              <p className="assign">Assigned to: <span>Dr. Mahevi Aasif</span></p>
              <p className="dept">Dept: Cardiology</p>
              <p>Angiography</p>
              <p>7th March, 2025<br />10:00am</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard

