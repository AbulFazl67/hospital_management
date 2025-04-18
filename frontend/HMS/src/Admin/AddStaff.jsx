import React, { useState } from 'react';
import './AddStaff.css';

const AddStaff = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    password: '',
    role: 'patient',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if(res.ok){
        const data = await res.json();
        console.log(data);
        alert("User registered successfully!");
        setFormData({ email: '', fullname: '', password: '', role: 'patient' });
      }else if(res.status==401){
        const data = await res.json();
        console.warn(res)
        console.warn(data)
        alert(data?.error);
      }
     
    } catch (err) {
      console.error(err);
      if(err.error=="User Already registered"){
        alert("User already registered!");
      }else{
        alert("Something went wrong!");
      }
     
    }
  };

  return (
    <div className="addStaff">
      <h2>Add Staff Member</h2>
      <form className="staff-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="clerk">Clerk</option>
        </select>
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default AddStaff;
