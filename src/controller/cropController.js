const cropModel = require("../model/cropModel");
const { isValid } = require("../validation/validation")



// ==============================Create Crop ============================================================
const createCrop = async function (req, res) {
    try {
        const data = req.body;
        const { soiltype, season, cropName, region } = data

        if (Object.keys(data).length === 0)
            return res.status(400).send({ status: false, msg: "provide data" })

        if (!isValid(soiltype))
            return res.status(400).send({ status: false, msg: "provide soiltype" })

        if (!isValid(season))
            return res.status(400).send({ status: false, msg: "provide season" })

        if (!isValid(cropName))
            return res.status(400).send({ status: false, msg: "provide Cropname" })

        let checkcrop = await cropModel.findOne({ cropName: cropName })
        if (checkcrop) return res.status(400).send({ status: false, msg: "cropname is already exist" })

        if (!isValid(region))
            return res.status(400).send({ status: false, msg: "provide region" })


        const theCrop = {
            soiltype,
            season,
            cropName,
            region
        }

        if (!['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'].includes(theCrop.season)) {
            return res.status(400).send({ status: false, Message: "Region must be from {Spring, Summer, Monsoon, Autumn, Winter}" })
        }

        if (!['East', 'West', 'North', 'South'].includes(theCrop.region)) {
            return res.status(400).send({ status: false, Message: "Region must be from {North, South, East, West}" })
        }

        if (!['alluvial', 'black', 'red', 'laterite', 'arid'].includes(theCrop.soiltype)) {
            return res.status(400).send({ status: false, Message: "Soil Type must be from {alluvial , black , red , laterite ,arid}" })
        }

        const savedata = await cropModel.create(theCrop)
        return res.status(201).send({ status: true, message: "crop created successfully", data: savedata })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
}



module.exports = { createCrop };