const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        maxLength: 15,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    firstName: {
        type: String,
        maxLength: 30,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        maxLength: 30,
        trim: true,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }