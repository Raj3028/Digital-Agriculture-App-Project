const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10
const organizationModel = require("../model/organizationModel");
const { isValidName, isValidPassword } = require("../validation/validation")



//============================== CREATE-ORGANISATION ==================================//
const createOrganization = async (req, res) => {

  try {

    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Please Provide Organization Information" });
    }
    const { organizationName, password } = data;
    if (!organizationName) {
      return res.status(400).send({ status: false, message: "organizationName is mandatory" });
    }
    if (!isValidName(organizationName)) {
      return res.status(400).send({ status: false, message: "organizationName is invalid" });
    }
    let organizationNames = await organizationModel.findOne({ organizationName });
    if (organizationNames) {
      return res.status(400).send({ status: false, message: "organization with this email already exists", });
    }

    if (!password) {
      return res.status(400).send({ status: false, message: "Password is mandatory" });
    }
    // if (!isValidPassword(password)) {
    //   return res.status(400).send({ status: false, message: "Password is invalid" })
    // }
    let encryptedPassword = bcrypt
      .hash(req.body.password, saltRound)
      .then((hash) => {
        // console.log(`Hash: ${hash}`);
        return hash;
      });
    req.body.password = await encryptedPassword;

    const organise = await organizationModel.create(data);
    return res.status(201).send({ status: true, message: "Organisation is successfully created", data: organise, });

  } catch (err) {

    return res.status(500).send({ status: false, message: err.message });
  }
};



// =========================== Login ==================================//
const organizationLogin = async (req, res) => {

  try {
    let data = req.body
    if (Object.keys(data).length == 0) {
      return res.status(400).send({ status: false, message: "Please Provide data" })
    }
    const { organizationName, password } = data
    if (!organizationName) {
      return res.status(400).send({ status: false, message: " organizationName is mandatory" })
    }

    if (!password) {
      return res.status(400).send({ status: false, message: "Password is mandatory" })
    }

    const Login = await organizationModel.findOne({ organizationName });
    if (!Login)
      return res.status(404).send({ status: false, message: " oragnization Name is not present " });

    let decodePwd = await bcrypt.compare(password, Login.password);
    if (!decodePwd)
      return res.status(400).send({ status: false, message: "Password not match" });

    let token = jwt.sign(
      {
        orgnizationId: Login._id.toString(),
      },
      "secreat_key for token",
      { expiresIn: "50d" }
    );

    return res.status(200).send({
      status: true, message: "Organization login successfully", data: { token: token },
    })

  }
  catch (err) {

    return res.status(500).send({ status: false, message: err.message });
  }
}




module.exports = { createOrganization, organizationLogin }
