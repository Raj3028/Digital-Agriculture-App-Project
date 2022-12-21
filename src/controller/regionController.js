const mongoose = require("mongoose");
const cropModel = require("../model/cropModel");
const regionModel = require("../model/regionModel");
const organizationModel = require("../model/organizationModel");
const { isValidObjectId } = require("../validation/validation");

//=====================================create Region=========================//
const createRegion = async function (req, res) {

  try {

    let data = req.body;

    let organizationId = req.params.organizationId;
    if (!organizationId)
      return res.status(400).send({ status: false, Message: "Please provide the organizationId. It's mandatory." });

    let findOrganization = await organizationModel.findById({ _id: organizationId });
    if (!findOrganization)
      return res.status(404).send({ status: false, Message: "This organization is not present." });

    if (Object.keys(data).length == 0)
      return res.status(400).send({ status: false, Message: "Please provide some data for creation." });


    let { property, cropId } = data;

    if (data.property) {
      if (!["East", "West", "North", "South"].includes(property.region)) {
        return res.status(400).send({ status: false, Message: "Region must be from {North, South, East, West}", });
      }
    }

    let findCrop = await cropModel.findOne({ _id: cropId }).select({ updatedAt: 0, __v: 0, createdAt: 0 });
    if (!findCrop) return res.status(404).send({ status: false, Message: "This crop is not present in DB." });

    let newRegion = {
      property: property,
      cropId: findCrop,
    };

    let saveDetails = await regionModel.create(newRegion);
    // console.log(saveDetails);
    return res.status(201).send({ status: true, Message: "Region is created successfully.", data: saveDetails });

  } catch (error) {

    return res.status(500).send({ status: false, Message: error.message });
  }
};


//================================ Get-Data ===============================//
const getOrganization = async (req, res) => {
  try {

    let queryDetail = req.query;
    let data = { isDeleted: false };
    let { region, fieldSize, season, soiltype, cropName } = queryDetail;

    if (Object.keys(queryDetail).length == 0) {
      let allRegion = await regionModel.find({ $and: [{ isDeleted: false }] });
      return res.status(200).send({ status: true, data: allRegion })
    }
    if (region && fieldSize) {
      let r = await regionModel.find({ "property.region": region, "property.fieldSize": fieldSize, isDeleted: false, });
      return res.status(200).send({ status: true, data: r, });
    }
    if (region) {
      let regions = await regionModel.find({ "property.region": region });
      return res.status(200).send({ status: true, data: regions, isDeleted: false, });
    }
    if (fieldSize) {
      let fieldSiz = await regionModel.find({ "property.fieldSize": fieldSize, isDeleted: false, });
      return res.status(200).send({ status: true, data: fieldSiz });
    }
    if (season && soiltype && cropName) {
      let f = await cropModel.find({ "season": season, "soiltype": soiltype, "cropName": cropName });
      return res.status(200).send({ status: true, data: f });
    }
    if (season && soiltype) {
      let d = await cropModel.find({ "season": season, "soiltype": soiltype, "cropName": cropName });
      return res.status(200).send({ status: true, data: d });
    }
    if (season && cropName) {
      let e = await cropModel.find({ "season": season, "soiltype": soiltype, "cropName": cropName });
      return res.status(200).send({ status: true, data: e });
    }
    if (soiltype && cropName) {
      let e = await cropModel.find({ "soiltype": soiltype, "cropName": cropName });
      return res.status(200).send({ status: true, data: e });
    }
    if (soiltype && season) {
      let e = await cropModel.find({ "soiltype": soiltype, "season": season });
      return res.status(200).send({ status: true, data: e });
    }
    if (season) {
      let fieldSi = await cropModel.find({ "season": season });
      return res.status(200).send({ status: true, data: fieldSi });
    }
    if (soiltype) {
      let soil = await cropModel.find({ "soiltype": soiltype });
      return res.status(200).send({ status: true, data: soil });
    }
    if (cropName) {
      let crop = await cropModel.find({ "cropName": cropName });
      return res.status(200).send({ status: true, data: crop });
    }

  } catch (error) {

    return res.status(500).send({ status: false, msg: error.message });
  }
};

//============================== Update-Region ================================//
const updateRegion = async function (req, res) {

  try {
    let data = req.body;
    let data2 = req.params;
    let { regionId, organizationId } = data2
    let { property } = data;

    if (!regionId) return res.status(400).send({ status: false, Message: "Please provide the regionId. It's mandatory.", });
    if (!organizationId) return res.status(400).send({ status: false, Message: "Please provide the organizationId. It's mandatory.", });

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Message: "Please provide some data for updation.", });

    if (data.property) {
      if (!["East", "West", "North", "South"].includes(property.region)) {
        return res.status(400).send({ status: false, Message: "Region must be from {North, South, East, West}", });
      }
    }

    let updatedFile = await regionModel.findOneAndUpdate({ _id: regionId, isDeleted: false }, { $set: { property: property } }, { new: true });
    if (!updatedFile)
      return res.status(400).send({ status: false, Message: `This region: "${regionId}" is not present or might be already deleted.` });

    return res.status(200).send({ status: true, Message: "Region is updated", data: updatedFile });

  } catch (error) {

    return res.status(500).send({ status: false, Message: error.message });
  }
};


//============================ Delete-Region ==========================================//
let deleteRegion = async function (req, res) {

  try {
    let regionId = req.params.regionId;

    let update = await regionModel.findOneAndUpdate({ _id: regionId, isDeleted: false }, { $set: { isDeleted: true } });
    if (!update)
      return res.status(404).send({ status: false, message: `No region found with this regionId: "${regionId}" or is already Deleted!` });

    return res.status(200).send({ status: true, message: "Region Deleted Successfully" });

  } catch (error) {

    return res.status(500).send({ status: false, Message: error.message });
  }
};




module.exports = { createRegion, updateRegion, getOrganization, deleteRegion };
