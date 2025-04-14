import React from 'react'
import './admin-dash.css'
import { Link } from 'react-router-dom';
const AdminDashboard = () => {
  return (
/*     <nav className="menu-bar">
      <div className="logo">MySite</div>
      <ul className="menu-items">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/doctors">Doctors</Link></li>
        <li><Link to="/admin/patient">Patient</Link></li>
        <li><Link to="/admin/addStaff">Add Staff</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav> */

    <div>
          {/*  <nav className="menu-bar">
      <div className="logo">MySite</div>
      <ul className="menu-items">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/doctors">Doctors</Link></li>
        <li><Link to="/admin/patient">Patient</Link></li>
        <li><Link to="/admin/addStaff">Add Staff</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
    </nav>  */}


    <div className="dashboard">

      <div className="leftSide">
      <ul className="menu-items">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/doctors">Doctors</Link></li>
        <li><Link to="/admin/patient">Patient</Link></li>
        <li><Link to="/admin/addStaff">Add Staff</Link></li>
        <li><Link to="/login">Logout</Link></li>
      </ul>
      </div>

      <div className="rightSide">
            <div className="topRight">
              <div className="top">
               <b><p>Doctors</p></b> 
                <p>See all...</p>
              </div>

              <div className="bottom">
                <div className="doctorCard">
                  <img src="/docimg.png" alt="" />
                  <b className='Name'>Dr Johhny Sins</b>
                  <p className='Name'>Cardiologist</p>
                  <button>Get Appointments</button>
                </div>


                <div className="doctorCard">
                  <img src="/docimg.png" alt="" />
                  <b className='Name'>Dr Johhny Sins</b>
                  <p className='Name'>Cardiologist</p>
                  <button>Get Appointments</button>
                </div>



                <div className="doctorCard">
                  <img src="/docimg.png" alt="" />
                  <b className='Name'>Dr Johhny Sins</b>
                  <p className='Name'>Cardiologist</p>
                  <button>Get Appointments</button>
                </div>



                
              </div>
            </div>
      </div>

    </div>
    </div>
  );
}

export default AdminDashboard

/* maiko yeh command whatsapp pe vapis bheko na */ /* rafce */
