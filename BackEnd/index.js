const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./route/postRoute.js');
const cors = require('cors');
const app=express()
app.use(cors({ origin: 'http://localhost:3000' }));
const PORT = process.env.PORT || 5000;

dotenv.config()
// DB connection
const connect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO); // connect to mongodb 
        console.log("connected to db");
    } catch(error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected");
})

app.use(bodyParser.json());

app.use('/api/posts', postRoutes);

app.listen(PORT, () => {
    connect();  
  console.log(`Server is running on port ${PORT}`);
});
