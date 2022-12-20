const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId



const regionSchema = new mongoose.Schema({
    property: {
        region: {
            type: String,
            enum: ['East', 'West', 'North', 'South'],
        },
        fieldSize: {
            type: String
            // required: true
        }
    },
    cropId: {
        type: ObjectId,
        ref: 'crop'
    },
    organizationId: {
        type: ObjectId,
        ref: 'organization'
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })



module.exports = mongoose.model("region", regionSchema);
