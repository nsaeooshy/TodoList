const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tasksRoute = require('./controllers/tasks');
const mongoose = require('mongoose');
require('dotenv/config');

//Middlewares
app.use(bodyParser.json());

//Routes
app.use('/tasks',tasksRoute);


//DB connection
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log('connected');
})

app.listen(3000)