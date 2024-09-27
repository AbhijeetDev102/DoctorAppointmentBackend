const express = require("express");
const sequelize = require("./config/dbConnect")
const router = require("./routers/routes")
const cors = require("cors")

const app = express()
app.use(express.json())

app.use(cors({
    origin:"*",
    methods:["*"]
}))


app.use("/api/v1", router)
app.get('/', (req, res)=>{
    res.send("hello server")
})




app.listen("4000", ()=>{
    console.log("all is listen on 4000 port number")
})

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull")
    }).catch((err)=>{
        throw err
    })