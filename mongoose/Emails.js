const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({
    email: { type: String, trim: true, required: true }
})

module.exports = mongoose.model('Email', emailSchema)
