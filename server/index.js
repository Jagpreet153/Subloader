const express = require('express');
const mongoose=require('mongoose')
const cors=require('cors')
const cloudinary=require('cloudinary')
const app= express();
require("dotenv").config();

const PORT= process.env.PORT || 3001;

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true
  };
  
app.use(cors(corsOptions));
  



const userRoutes = require('./routes/router')
app.use("/api/v2", userRoutes)

app.listen(PORT,()=>{
    console.log(`Server started at port number ${PORT}`)
})

const dbConnect=require('./config/database')
dbConnect;

app.get('/',(req,res)=>{
        res.send("<h1>Hello to Signup Page</h1>")
})