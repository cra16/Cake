'use strict';

var exec = require('child_process').exec;
var fs = require('fs');

/**
 * exec?
 */
exports.doCompile = function (req, res) {
    //console.log('exec');

    //exec('./public/code/magic_square', function (error, stdout, srderr) {
    //    console.log(stdout);
        //res.send(stdout);
        //res.redirect('/');
        //res.set('Content-Type', 'text/html');
        //res.send(new Buffer(stdout));
        //res.format({
            //'text/plain': function(){
            //    res.send('hey');
            //},

    //        'text/html': function(){
    //            res.send("<p>This is a Magic Square program.</p>");
    //        }
    //    });
    //});

    //console.log(req.body.content);

    var code = req.body.content;

    fs.writeFile('public/temp_code.c', code, function (err) {
        if (err) throw err;
    });

    //var wstream = fs.createWriteStream('myOutput.txt', { flags: 'w' });
    //wstream.write("ss");
    //wstream.end();
    //var fs = require('fs');
    //var stream = fs.createWriteStream("my_file.txt");
    //stream.once('open', function(fd) {
    //    stream.write("My first row\n");
    //    stream.write("My second row\n");
    //    stream.end();
    //});

    exec('gcc -o public/temp_code public/temp_code.c', function (error, stdout, srderr) {
        var output;
        if (srderr !== '') {
            console.log('error');
            console.log(srderr);
            output = {
                content: srderr
            };
            srderr = null;
            res.json(output);
        } else {
            console.log('stdout');
            exec('./public/temp_code', function (error, stdout, srderr) {
                    output = {
                        content: stdout
                    };
                res.json(output);
            });
        }
    });
    //fs.open('a.c','w+', function(err, fd) {
    //    var buf = 'abc';
    //    if (err) {
    //        console.log(err);
    //    } else {
    //        fs.write(fd, buf, 0, buf.length);
    //    }
    //});

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
