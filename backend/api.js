const conn=require('./db.js')

const app=require('./express.js');

console.warn("api called")
app.post("/register" , (req , res)=>{
    const sql="insert into user(email , password , fullname) values(?,?,?)";
    conn.query(sql , [req.body.email , req.body.password , req.body.fullname] , (err , res1)=>{
        if(err){
            console.error(err)
            res.status(401).send({error:"Cannot register user"})
        }else{
            res.status(201).send({msg:"Registered successfully"})
        }
    })
})

app.post('/login' , (req , res)=>{
    const sql="select * from user where email=? and password=?";
    conn.query(sql , [req.body.email , req.body.password] , (err , result)=>{
        if(err){
            console.error(err)
            res.status(401).send({error:"Invalid Credentials"})
        }else{
            console.warn(result[0])
            if(result[0]){ // undefined not null 0 ""
                res.status(200).send({msg:"Login successfull"})
                
            }else{
                res.status(401).send({error:"Invalid Credentials"})
            }
        }
    })
})