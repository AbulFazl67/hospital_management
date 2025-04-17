const conn = require('./db.js')

const app = require('./express.js');

console.warn("api called")
app.post("/register", (req, res) => {
    const sql = "insert into user(email , password , fullname , role) values(?,?,?,?)";
    const password = Buffer.from(req.body.password, 'utf-8').toString('base64');
    conn.query(sql, [req.body.email, password, req.body.fullname, req.body.role], (err, res1) => {
        if (err) {
            console.error(err)
            res.status(401).send({ error: "Cannot register user" })
        } else {
            res.status(201).send({ msg: "Registered successfully", status: 201 })
        }
    })
})

app.post('/login', (req, res) => {
    const sql = "select * from user where email=? and password=?";
    conn.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error(err)
            res.status(401).send({ error: "Invalid Credentials" })
        } else {
            console.warn(result[0])
            if (result[0]) { // undefined not null 0 ""
                res.status(200).send({ msg: result[0] })

            } else {
                res.status(401).send({ error: "Invalid Credentials" })
            }
        }
    })
})

app.post('/update-password', (req, res) => {
    const sql = "update user set password=? where email=?";
    conn.query(sql, [req.body.password, req.body.email], (err, result) => {
        if (err) {
            res.status(500).send({
                error: 'error in sql query'
            })
        } else {
            res.status(200).send({ msg: 'password updated successfully' })
        }
    })
})

app.get('/get-doctors-patient/:id', (req, res) => {
    const sql = "select * from treatment where doctor_id=?";
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            if (result.length > 0) {
                res.status(200).send({ msg: result })
            } else {
                res.status(401).send({ error: 'no treatment found' })
            }
        }
    })
})

app.post('/add-treatment', (req, res) => {
    const sql = "insert into treatment(treatmentname,treatmetdate,doctor_id,patient_id) values(?,?,?,?)";
    conn.query(sql, [req.body.treatment, req.body.date, req.body.doctor, req.body.patient], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            res.status(200).send({ msg: 'treatment added successfully' })
        }
    })
})

app.get('/treatment/:id', (req, res) => {
    const sql = "select * from treatment where treatment_id=?";
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            if (result.length > 0) {
                res.status(200).send({ msg: result })
            } else {
                res.status(401).send({ error: 'no treatment found' })
            }

        }
    })
})


app.put('/update-treatment', (req, res) => {
    const sql = "update treatment set treatmentname=?,treatmetdate=?,doctor_id=?,patient_id=? where treatment_id=? ";
    conn.query(sql, [req.body.treatment, req.body.date, req.body.doctor, req.body.patient, req.body.id], (err, result) => {
        if (err) {
            console.warn(err)
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            res.status(200).send({ msg: 'treatment updated successfully' })
        }
    })
})


app.post('/add-appointment', (req, res) => {
    const sql = "insert into appointment(patient_id,doctor_id,appointment_datetime) values(?,?,?)";
    conn.query(sql, [req.body.patient_id, req.body.doctor_id, req.body.appointment_datetime], (err, result) => {
        if (err) {
            console.warn(err)
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            res.status(200).send({ msg: 'Appointment Created Successfully' })
        }
    })
})

app.put('/update-appointment', (req, res) => {
    const sql = "update appointment set patient_id=?,doctor_id=?,appointment_datetime=? where appointment_id=?";
    conn.query(sql, [req.body.patient_id, req.body.doctor_id, req.body.appointment_datetime, req.body.id], (err, result) => {
        if (err) {
            console.warn(err)
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            res.status(200).send({ msg: 'Appointment Updated Successfully' })
        }
    })
})

app.delete('/appointment', (req, res) => {
    const sql = "delete from appointment where appointment_id=?";
    conn.query(sql, [req.body.id], (err, result) => {
        if (err) {
            console.warn(err)
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            res.status(200).send({ msg: 'Appointment Deleted Successfully' })
        }
    })
})


app.post('/upcoming-appintment', (req, res) => {
    const now = new Date(); // Current local time
    const utcDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000) // Convert to UTC
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    const sql = "SELECT * FROM appointment WHERE DATE(appointment_datetime) > ? AND doctor_id = ?";
    conn.query(sql, [utcDate, req.body.id], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            if (result.length > 0) {
                res.status(200).send({ msg: result })
            } else {
                res.status(401).send({ error: 'no appointment found' })
            }

        }
    })
})



app.get('/get-patient-treatment/:id', (req, res) => {
    const sql = "select * from treatment where patient_id=?";
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            if (result.length > 0) {
                res.status(200).send({ msg: result })
            } else {
                res.status(401).send({ error: 'no treatment found' })
            }
        }
    })
})




app.post('/add-invoice', (req, res) => {
    const sql = "INSERT INTO invoice (total_amount, payment_method, treatment_id, user_id) VALUES (?, ?, ?, ?)";
    conn.query(sql, [req.body.total_amount, req.body.payment_method, req.body.treatment_id, req.body.user_id], (err, result) => {
        if (err) {
            console.warn(err)
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            res.status(200).send({ msg: 'invoice Created Successfully' })
        }
    })
})


app.put('/update-invoice/:invoice_id', (req, res) => {
    const { total_amount, payment_method, treatment_id, user_id } = req.body;
    const { invoice_id } = req.params;

    if (!total_amount || !payment_method || !treatment_id || !user_id) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    const sql = "UPDATE invoice SET total_amount=?, payment_method=?, treatment_id=?, user_id=? WHERE invoice_id=?";
    conn.query(sql, [total_amount, payment_method, treatment_id, user_id, invoice_id], (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.status(500).send({ error: 'Error in SQL query' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'Invoice not found' });
        }

        res.status(200).send({ msg: 'Invoice updated successfully' });
    });
});



app.get('/get-invoice/:id', (req, res) => {
    const sql = "select * from invoice where invoice_id=?";
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            if (result.length > 0) {
                res.status(200).send({ msg: result })
            } else {
                res.status(401).send({ error: 'no treatment found' })
            }
        }
    })
})

app.get('/get-invoice', (req, res) => {
    const sql = "select * from invoice ";
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {
            if (result.length > 0) {
                res.status(200).send({ msg: result })
            } else {
                res.status(401).send({ error: 'no treatment found' })
            }
        }
    })
})


app.get('/get-doctors', (req, res) => {
    const sql = "select * from user where role='doctor' ";
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {

            res.status(200).send({ msg: result })

        }
    })
})


app.get('/get-patient', (req, res) => {
    const sql = "select * from user where role='patient' ";
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {

            res.status(200).send({ msg: result })

        }
    })
})


app.get('/get-clerk', (req, res) => {
    const sql = "select * from user where role='clerk' ";
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {

            res.status(200).send({ msg: result })

        }
    })
})


app.get('/get-user-info/:id', (req, res) => {
    const sql = "select * from user where user_id=? ";
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(401).send({
                error: 'error in sql query'
            })
        } else {

            res.status(200).send({ msg: result })

        }
    })
})




app.put("/update-user", (req, res) => {
    const sql = "update user set password=? ,fullname=? where user_id=?"
    conn.query(sql, [req.body.password, req.body.name, req.body.id], (err, result) => {
        if (err) {
            res.status(401).send("Error in sql")
        } else {
            res.status(200).send("Updated SuccessFully")
        }
    })
})


app.get('/getPatientsAppointment/:id', (req, res) => {
    const sql = "select * from appointment where patient_id=?"
    conn.query(sql, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).send({ error: err })
        } else {
            if (result.length > 0) {
                res.status(200).send({ msg: result, status: 200 })
            } else {
                res.status(404).send({ msg: "No Appointments Found", status: 404 })
            }
        }
    })
})

app.get('/getAllAppointment', (req, res) => {
    const sql = "SELECT * FROM appointment";
    conn.query(sql, (err, appointments) => {
        if (err) {
            return res.status(500).send({ error: err });
        }

        if (appointments.length === 0) {
            return res.send({ result: [] });
        }

        // Use Promise.all to wait for all queries to finish
        const promises = appointments.map(appointment => {
            return new Promise((resolve, reject) => {
                const sql1 = "SELECT * FROM user WHERE user_id=?";
                conn.query(sql1, [appointment.patient_id], (err1, userResult) => {
                    if (err1) {
                        reject(err1);
                    } else {
                        const data = {
                            patient_name: userResult[0]?.fullname || "Unknown",
                            appointment_id: appointment.appointment_id,
                            appointment_datetime: appointment.appointment_datetime
                        };
                        resolve(data);
                    }
                });
            });
        });

        Promise.all(promises)
            .then(finalResult => {
                console.warn(finalResult)
                res.send({ result: finalResult });
            })
            .catch(error => {
                res.status(500).send({ error: error });
            });
    });
});
