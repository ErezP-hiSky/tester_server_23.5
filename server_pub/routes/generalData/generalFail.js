const express = require('express');
var router = express.Router();

const GeneralTestDataTemp = require('../../models/GeneralTestData');

// api for /general-test-data/only_fail ...

router.get("/", function(req, res) {
    GeneralTestDataTemp.find({final_test_result: {$eq: "fail"}}, 
    function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});


router.get("/tester/:tester_name", function(req, res) {
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

router.get("/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo", function(req, res) {
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

router.get("/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo/antenna_type/:antType/frequency_band/:freqBand", function(req, res) {
        
    var tester_name_query = undefined;
    var date_query = undefined;
    var antenna_type_query = undefined;
    var product_type_query = undefined;
    
    if (req.params.tester_name === 'all') {
        tester_name_query = undefined
    } else {
        tester_name_query = {$eq: req.params.tester_name}
    }
    if (req.params.dateTo === 'all') {
        date_query = undefined
    } else {
        date_query = {$gte: new Date(req.params.dateFrom), 
            $lte: new Date(req.params.dateTo)}
    }
    if (req.params.antType === 'all') {
        antenna_type_query = undefined
    } else {
        antenna_type_query = {$in: [req.params.antType]}
    }   
    if (req.params.freqBand === 'all') {
        product_type_query = undefined
    } else {
        product_type_query = {$in: [req.params.freqBand]}
    }   
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            Tester_name: tester_name_query,
            Test_Date: date_query,
            antenna_type: antenna_type_query,
            product_type: product_type_query
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

router.get("/tests/:tests", function(req, res) {
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

router.get("/tests/:tests/\
tester/:tester_name", function(req, res) {
    var test_failed_query = undefined;
    var tester_name_query = undefined;
    if (req.params.tests === 'all') {
        test_failed_query = undefined
    } else {
        test_failed_query = {$in: [req.params.tests]}
    }
    if (req.params.tester_name === 'all') {
        tester_name_query = undefined
    } else {
        tester_name_query = {$eq: req.params.tester_name}
    }   

    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            tests_failed: test_failed_query,
            Tester_name: tester_name_query
        }, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/tests/:tests/tester/:tester_name/date_from/:dateFrom/date_to/:dateTo", function(req, res) {    
    
    GeneralTestDataTemp.find(
        {
            final_test_result: {$eq: "fail"},
            tests_failed: {$in: [req.params.tests]},
            Tester_name: {$eq: req.params.tester_name},
            Test_Date: {$gte: new Date(req.params.dateFrom), 
                $lte: new Date(req.params.dateTo)}
        }, function(err, foundGeneralTestDataTemp) {
        if (!err) {
            res.send(foundGeneralTestDataTemp);
        } else {
            res.send("The error is: " + err);
        }
    });
});

router.get("/tests/:tests/\
tester/:tester_name/\
date_from/:dateFrom/date_to/:dateTo/\
antenna_type/:antType/\
frequency_band/:freqBand", 
    function(req, res) {
        var tests_query = undefined;
        var tester_name_query = undefined;
        var date_query = undefined;
        var antenna_type_query = undefined;
        var product_type_query = undefined;
        if (req.params.tests === 'all') {
            tests_query = undefined
        } else {
            tests_query = {$in: [req.params.tests]}
        }
        if (req.params.tester_name === 'all') {
            tester_name_query = undefined
        } else {
            tester_name_query = {$eq: req.params.tester_name}
        }
        if (req.params.dateTo === 'all') {
            date_query = undefined
        } else {
            date_query = {$gte: new Date(req.params.dateFrom), 
                $lte: new Date(req.params.dateTo)}
        }
        if (req.params.antType === 'all') {
            antenna_type_query = undefined
        } else {
            antenna_type_query = {$in: [req.params.antType]}
        }   
        if (req.params.freqBand === 'all') {
            product_type_query = undefined
        } else {
            product_type_query = {$in: [req.params.freqBand]}
        }   
        GeneralTestDataTemp.find(
            {
                final_test_result: {$eq: "fail"},
                tests_failed: tests_query,
                Tester_name: tester_name_query,
                Test_Date: date_query,
                antenna_type: antenna_type_query,
                product_type: product_type_query
            }, function(err, foundGeneralTestDataTemp) {
            if (!err) {
                res.send(foundGeneralTestDataTemp);
            } else {
                res.send("The error is: " + err);
            }
        });
});


module.exports = router;