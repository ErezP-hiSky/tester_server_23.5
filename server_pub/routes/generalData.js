const express = require('express');
var router = express.Router();

const generalTestDataSchema = {
    _id: Number,
    testerName: Number,
    testDate: Date,
    unitSN: Number,
    finalTestResult: String
};
generalTestDataCollectionName = "general_tester_data";

const GeneralTestDataTemp = mongoose.model("GeneralTestDataTemp", generalTestDataSchema, generalTestDataCollectionName);

app.route("/")

    .get(function(req, res) {
        GeneralTestDataTemp.find(function(err, foundGeneralTestDataTemp) {
            if (!err) {
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
    });

app.route("/only_finished")

    .get(function(req, res) {
        GeneralTestDataTemp.find({final_test_result: {$ne: "started"}}, function(err, foundGeneralTestDataTemp) {
            if (!err) {
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
    });

app.route("/findbyUnitSN/:unitSN")

    .get(function (req, res) {
        // console.log("/general-test-data/findbyUnitSN");
        // console.log(req.params.unitSN);
        GeneralTestDataTemp.find({unit_SN: { $eq: req.params.unitSN }, final_test_result: {$ne: "started"}}, function(err, foundGeneralTestDataTemp) {
            if (!err) {
                // console.log(`found is ${foundGeneralTestDataTemp}`);
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
    });


app.route("/findbyUnitSNrange/:unitSNfrom/:unitSNto")

    .get(function (req, res) {
        GeneralTestDataTemp.find({unit_SN: { $gte: req.params.unitSNfrom, 
                    $lte: req.params.unitSNto },
                    final_test_result: {$ne: "started"}}, 
                    function(err, foundGeneralTestDataTemp) {
            if (!err) {
                // console.log(`found is ${foundGeneralTestDataTemp}`);
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
    });

app.route("/findbyUnitSNrangeNdate/:unitSNfrom/:unitSNto/dateFrom/:DateFrom/dateTo/:DateTo")
// Test_Date: {$gte: new Date(req.params.DateFrom), 
// $lte: new Date(req.params.DateTo)},
    .get(function (req, res) {
        GeneralTestDataTemp.find({ unit_SN: { $gte: req.params.unitSNfrom, 
                    $lte: req.params.unitSNto },
                    Test_Date: {$gte: new Date(req.params.DateFrom), 
                        $lte: new Date(req.params.DateTo)},
                    final_test_result: {$ne: "started"}}, 
                    function(err, foundGeneralTestDataTemp) {
            if (!err) {
                // console.log(`found is ${foundGeneralTestDataTemp}`);
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
    });


app.route("/findbyid/:collectionId")
    
    .get(function (req, res) {
        GeneralTestDataTemp.findById(req.params.collectionId, function(err, foundGeneralTestDataTemp) {
            if (!err) {
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
    });
