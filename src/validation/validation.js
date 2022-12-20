const mongoose = require('mongoose');



const isValidName = (name) => {
    if (/^[A-Za-z]{1,35}/.test(name)) return true
    return false
}

const isValidPassword = (password) => {
    if (/^.(?=.{6,})(?=.[a-zA-Z])(?=.\d)(?=.[!&$%&? "]).*$/.test(password)) return true
    return false
}

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
}

const isValid = function (value) {

    if (typeof value === "undefined" || typeof value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};



module.exports = { isValidName, isValidPassword, isValidObjectId, isValid }