const express = require("express");
const app = express()


app.get('/', (req, res)=>{
    res.send("hello server")
})

app.listen("4000", ()=>{
    console.log("all is listen on 4000 port number")
})