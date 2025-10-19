const mongoose = require('mongoose')

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log('MongoDB Connected')
    } catch (error) {
        console.error(`Error ${error}`)
        process.exit(1)
    }
}

module.exports = connect