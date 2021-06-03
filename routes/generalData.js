const express = require('express');
var router = express.Router();

const GeneralTestDataTemp = require('../models/GeneralTestData');

router.get("/", function(req, res) {
    GeneralTestDataTemp.find(function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_finished", function(req, res) {
    GeneralTestDataTemp.find({final_test_result: {$ne: "started"}}, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_pass", function(req, res) {
    GeneralTestDataTemp.find({final_test_result: {$eq: "pass"}}, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_pass/tester/:tester_name", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "pass"},
            Tester_name: {$eq: req.params.tester_name}
        }, function(err, foundGeneralTestDataTemp
            ) 
            {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_pass/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "pass"},
            Tester_name: {$eq: req.params.tester_name},
            Test_Date: {$gte: new Date(req.params.dateFrom), 
                $lte: new Date(req.params.dateTo)}
        }, function(err, foundGeneralTestDataTemp
            ) 
            {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_pass/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo/antenna_type/:antType/frequency_band/:freqBand", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "pass"},
            Tester_name: {$eq: req.params.tester_name},
            Test_Date: {$gte: new Date(req.params.dateFrom), 
                $lte: new Date(req.params.dateTo)},
            antenna_type: {$in: [req.params.antType]},
            product_type: {$in: [req.params.freqBand]}
        }, function(err, foundGeneralTestDataTemp
            ) 
            {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_fail", function(req, res) {
    GeneralTestDataTemp.find({final_test_result: {$eq: "fail"}}, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_fail/tester/:tester_name", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            Tester_name: {$eq: req.params.tester_name}
        }, 
        function(err, foundGeneralTestDataTemp) 
        {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_fail/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            Tester_name: {$eq: req.params.tester_name},
            Test_Date: {$gte: new Date(req.params.dateFrom), 
                $lte: new Date(req.params.dateTo)}
        }, 
        function(err, foundGeneralTestDataTemp) 
        {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_fail/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo/antenna_type/:antType/frequency_band/:freqBand", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            Tester_name: {$eq: req.params.tester_name},
            Test_Date: {$gte: new Date(req.params.dateFrom), 
                $lte: new Date(req.params.dateTo)},
            antenna_type: {$in: [req.params.antType]},
            product_type: {$in: [req.params.freqBand]}
        }, 
        function(err, foundGeneralTestDataTemp) 
        {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_fail/tests/:tests", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            tests_failed: {$in: [req.params.tests]}
        }, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_fail/tests/:tests/tester/:tester_name", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            tests_failed: {$in: [req.params.tests]},
            Tester_name: {$eq: req.params.tester_name}
        }, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/only_fail/tests/:tests/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo/antenna_type/:antType/frequency_band/:freqBand", function(req, res) {
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            tests_failed: {$in: [req.params.tests]},
            Tester_name: {$eq: req.params.tester_name},
            Test_Date: {$gte: new Date(req.params.dateFrom), 
                $lte: new Date(req.params.dateTo)},
            antenna_type: {$in: [req.params.antType]},
            product_type: {$in: [req.params.freqBand]}
        }, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/findbyUnitSN/:unitSN", function (req, res) {
    GeneralTestDataTemp.find({unit_SN: 
        { $eq: req.params.unitSN }, 
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

router.get("/findbyUnitSNrange/:unitSNfrom/:unitSNto", function (req, res) {
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

router.get("/findbyUnitSNrangeNdate/:unitSNfrom/:unitSNto/dateFrom/:DateFrom/dateTo/:DateTo", function (req, res) {
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


router.get("/findbyid/:collectionId", function (req, res) {
    GeneralTestDataTemp.findById(req.params.collectionId, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});



module.exports = router;

