const mongoose = require('mongoose')
const config = require('../config/config')

function connect() {
    mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err)
    })
}

module.exports = connect