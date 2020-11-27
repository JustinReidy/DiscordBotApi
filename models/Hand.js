const mongoose = require("mongoose")
const Schema = mongoose.Schema
const handSchema = new Schema ({
    userId: {
        type: String,
        required: true
    },
    cards: Array
})

module.exports = mongoose.model('Hand', handSchema)