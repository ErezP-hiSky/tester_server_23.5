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

router.get('/last', (req,res) =>{
    GeneralTestDataTemp.findOne({}, {}, { sort: { 'Test_Date' : -1 } }, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            res.send("The error is: " + err)
        }
    })
})

router.get("/only_finished", function(req, res) {
    GeneralTestDataTemp.find({final_test_result: {$ne: "started"}}, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/findbyUnitSN/:unitSN", function (req, res) {
    GeneralTestDataTemp.find({unit_SN: 
        { $eq: req.params.unitSN } ,
        final_test_result: {$ne: "started"} // ne = not equal
        },
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

router.get("/findbyUnitSNrangeNdate/:unitSNfrom/:unitSNto/dateFrom" + 
    "/:DateFrom/dateTo/:DateTo/passfail/:passfail", function (req, res) {
    const passOrFail = req.params.passfail;
    const testResultFilter = passOrFail === 'all' ? {$ne: "started"} :
        passOrFail === 'onlyPass' ? {$eq: "pass"} : {$eq: "fail"};
    GeneralTestDataTemp.find({ unit_SN: { $gte: req.params.unitSNfrom, 
                $lte: req.params.unitSNto },
                Test_Date: {$gte: new Date(req.params.DateFrom), 
                    $lte: new Date(req.params.DateTo)},
                final_test_result: testResultFilter}, 
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


router.get("/findbyDate/:startDate/:stopDate", function (req, res) {
    GeneralTestDataTemp.find({Test_Date: 
        {$gte: new Date(req.params.startDate), 
            $lte: new Date(req.params.stopDate)} 
        },
        function(err, foundGeneralTestDataTemp) {
            if (!err) {
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
});


module.exports = router;

