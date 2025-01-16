const express = require('express');
const cors=require('cors')
const app= express();
require("dotenv").config();

const PORT= process.env.PORT || 3001;

app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000','https://subloader.vercel.app'], 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add supported methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Add allowed headers
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