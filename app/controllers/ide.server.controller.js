'use strict';

var exec = require('child_process').exec;
var fs = require('fs');

/**
 * exec?
 */
exports.doCompile = function (req, res) {
    var code = req.body.content; // code from user
    var emptyCode = 'int main(int argc, char** argv) {\n\n  return 0;\n}'; // define empty code string
    var path = 'public/tmp/'; // define temporary code & executable dir

    if (code == emptyCode) {
        console.log('empty body!!!');
    } else {
        fs.writeFile(path + 'temp_code.c', code, function (err) {
            if (err) throw err;
        });
        exec('gcc -o ' + path + 'temp_code ' + path + 'temp_code.c', function (error, stdout, stderr) {
            var output;
            if (stderr !== '') {
                console.log('error');
                console.log(stderr);
                output = { content: stderr };
                stderr = null;
                res.json(output);
            } else {
                console.log('stdout:');
                exec(path + 'temp_code', function (error, stdout, stderr) {
                    console.log(stdout);
                    output = {
                        content: stdout
                    };
                    res.json(output);
                });
            }
        });
    };
}
