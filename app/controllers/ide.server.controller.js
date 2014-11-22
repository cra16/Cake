'use strict';

var exec = require('child_process').exec;

/**
 * exec?
 */
exports.get = function (req, res) {
    console.log('exec');

    exec('./public/code/magic_square', function (error, stdout, srderr) {
        console.log(stdout);
        //res.send(stdout);
        //res.redirect('/');
        //res.set('Content-Type', 'text/html');
        //res.send(new Buffer(stdout));
        res.format({
            //'text/plain': function(){
            //    res.send('hey');
            //},

            'text/html': function(){
                res.send("<p>This is a Magic Square program.</p>");
            }
        });
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
