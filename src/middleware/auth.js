const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const organizationModel = require("../model/organizationModel")
const regionModel = require("../model/regionModel")
const { isValidObjectId } = require('../validation/validation')


// ======================================== Authenticate =====================================================//
let Authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) return res.status(403).send({ status: false, message: "token is required" })

        jwt.verify(token, "secreat_key for token", (error, decodedToken) => {
            if (error) {
                return res.status(401).send({ message: error.message })
            }
            else {
                req.token = decodedToken
                next()
            }
        })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}


// ======================================== Authorization =====================================================//


const Authorization = async function (req, res, next) {
    try {

        const userId = req.params.organizationId
        if (!userId) return res.status(400).send({ status: false, message: "Organization Id must be present" })

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Organization Id is invalid" });


        const checkUserId = await organizationModel.findOne({ _id: userId })
        // console.log(checkUserId)

        if (!checkUserId) {
            return res.status(400).send({ status: false, message: "already deleted" })
        }

        if (req.token.organizationId != checkUserId.organizationId) return res.status(403).send({ status: false, message: "Unauthorize Access....." });
        next()

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { Authenticate, Authorization }
