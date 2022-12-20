const mongoose = require("mongoose");


const cropSchema = new mongoose.Schema({

    soiltype: {
        type: String,
        // enum :['alluvial' , 'black' , 'red' , 'laterite' ,'arid'],
        required: true
    },
    season: {
        type: String,
        required: true
    },
    cropName: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        type: String,
        // enum: ['East' , 'West' , 'North' , 'South'],
        required: true
    }

}, { timestamps: true })



module.exports = mongoose.model("crop", cropSchema);