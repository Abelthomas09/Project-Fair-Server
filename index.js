//Loads .env file contents into process.env by default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const pfSever = express()

pfSever.use(cors())
pfSever.use(express.json())
pfSever.use(router)
pfSever.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

pfSever.listen(PORT,()=>{
    console.log(`Project Fair Server started at port : ${PORT} and waiting for the client Reqest!!!`);
})

//http://localhost:3000/ get
pfSever.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red" >Project Fair Server started at port and waiting for the client Reqest </h1>`)
})
