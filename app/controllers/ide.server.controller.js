
'use strict';

var exec = require('child_process').exec;
var fs = require('fs');

/**
 * To save projects
 * @type {*|exports}
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Project = mongoose.model('Project'),
    _= require('lodash');


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
};

exports.create = function (req, res) {
    var project = new Project(req.body);
    project.user = req.user;

    project.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(project);
        }
    });
};


exports.read = function (req, res) {
    res.json(req.project);
};

exports.update = function (req, res) {
    var project = req.project;

    project = _.extend(project, req.body);

    project.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(project);
        }
    });
};

exports.delete = function (req, res) {
    var project = req.project;

    project.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(project);
        }

    });
};

exports.list = function (req, res) {
    Project.find().sort('-created').populate('user', 'displayName').exec(function (err, projects) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(projects);
        }
    });
};

exports.projectByID = function (req, res, next, id) {
    Project.findById(id).populate('user', 'displayName').exec(function (err, project) {
        if (err) return next(err);
        if (!project) return next(new Error('Failed to load project ' + id));
        req.project = project;
        next();
    });
};

/**
 * Project authorization middleware
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.project.user.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};

