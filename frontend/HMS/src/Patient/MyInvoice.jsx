import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './pat-dashboard.css';

const MyInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`http://localhost:3000/get-patient-invoice/${userId}`);
        const data = await response.json();
        if (Array.isArray(data.msg)) {
          setInvoices(data.msg);
        } else {
          setInvoices([]);
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
        setInvoices([]);
      }
    };

    if (userId) {
      fetchInvoices();
    }
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
        <h2>My Invoices</h2>
        {invoices?.length > 0 ? (
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Treatment ID</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.invoice_id}>
                  <td>{invoice.invoice_id}</td>
                  <td>₹{invoice.total_amount}</td>
                  <td>{invoice.payment_method}</td>
                  <td>{invoice.treatment_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No invoices found.</p>
        )}
      </main>
    </div>
  );
};

export default MyInvoice;
