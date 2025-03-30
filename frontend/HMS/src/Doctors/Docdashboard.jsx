import React from 'react'

const Docdashboard = () => {

  console.warn("doc daashboard")

    const getAllAppointments=async ()=>{
        try{
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email:email, password:password ,fullname: fullname , role:'patient' }),
              });
        }
        catch(e){

        }
    }

  return (
    <div>
      <h2>wellcome to dashboard</h2>
      <button>Get All Appointments</button>
    </div>
  )
}

export default Docdashboard
