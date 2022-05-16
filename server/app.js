require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./db/connect')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// middlewares

//routes
app.use('/user',userRoutes)

// Connect to mongodb
// Set up your mongodb url by making a new file named .env or edit the existing .env file by your mongodb account url
const PORT = process.env.PORT || 5000
const URI = process.env.MONGODB_URL
const start = async () => {
    try {
        await connectDB(URI)
        app.listen(PORT, () => {
        console.log('Server is running on port',PORT)
        })
    } catch (err) {
        console.log(err);
    }
}

start();

