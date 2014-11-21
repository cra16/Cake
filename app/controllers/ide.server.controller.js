'use strict';

var exec = require("child_process").exec;

/**
 * exec?
 */
exports.get = function (req, res) {
    console.log("exec");

    exec("ls -lah", function (error, stdout, srderr) {
        console.log(stdout);
    });
};

/*
exports.run = function(req, res) {
    var test = new Test(req.body);
    test.user = req.user;

    test.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(test);
        }
    });
};

function start() {
    console.log("Request handler 'start' was called.");
    var content = "empty";

    exec("ls -lah", function (error, stdout, stderr) {
        content = stdout;
    });

    return content;
}

function upload() {
    console.log("Request handler 'upload' was called.");
    return "Hello Upload";
}

exports.start = start;
exports.upload = upload;*/
