const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    }
    },
    {
        timestamps: true
    }    
)

module.exports = mongoose.model('User', userSchema)

