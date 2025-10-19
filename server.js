const express = require('express')
const dotenv = require('dotenv')

const connection = require('./config/db')
const userRoutes = require('./routes/userRoutes')

dotenv.config()
connection()

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
