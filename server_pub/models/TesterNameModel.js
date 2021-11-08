const mongoose = require('mongoose');

const testerNameDataSchema = {
    _id: Number,
    testerName: String  
};

testerNameDataCollectionName = "Tester_names";

module.exports = mongoose.model("testerNameData", testerNameDataSchema, testerNameDataCollectionName);
