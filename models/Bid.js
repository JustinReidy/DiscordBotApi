const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bidSchema = new Schema ({
    userId: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    bid: {
        type: Number,
        required: true
    } 
})

module.exports = mongoose.model('Bid', bidSchema)