const mongoose = require('mongoose');

const macDataSchema = {
    Mac_Address: String,
    SN: String,
    Note1: String,
    Name: String,
    isTaken: String
};

macDataCollectionName = "mac_addresses";

module.exports = mongoose.model("macData", macDataSchema, macDataCollectionName);
