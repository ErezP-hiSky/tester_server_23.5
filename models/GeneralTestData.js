const mongoose = require('mongoose');

const generalTestDataSchema = {
    _id: Number,
    testerName: Number,
    testDate: Date,
    unitSN: Number,
    finalTestResult: String
};

generalTestDataCollectionName = "general_tester_data";

module.exports = mongoose.model("GeneralTestDataTemp", generalTestDataSchema, generalTestDataCollectionName);
