const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://imgs.search.brave.com/X7XPq0yunGvlrkH7gP12GzAcbLpgJ9-xhHWwA9RtyRQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzMzLzU0Lzc4/LzM2MF9GXzYzMzU0/Nzg0Ml9BdWdZemV4/VHBNSjl6MVljcFRL/VUJvcUJGMENVQ2sx/MC5qcGc"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, 
{ timestamps: true }
)


userSchema.methods.generateToken = function() {
    return jwt.sign({ 
        id: this._id,
        username: this.username,
        email: this.email,
    }, config.JWT_SECRET)
    
}

userSchema.statics.verifyToken = function(token) {
    return jwt.verify(token, config.JWT_SECRET)
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model('User', userSchema)


module.exports = userModel