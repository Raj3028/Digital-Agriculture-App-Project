const mongoose = require("mongoose");



const organizationSchema = new mongoose.Schema({


    organizationName: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
        unique: true,
    },

}, { timestamps: true })



module.exports = mongoose.model("organization", organizationSchema);