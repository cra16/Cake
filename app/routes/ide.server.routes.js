'use strict';

/**
 * Module dependencies.
 */
//var compile = require('../../app/controllers/ide.server.controller');

var users = require('../../app/controllers/users.server.controller'),
    projectsController = require('../../app/controllers/ide.server.controller');

module.exports = function(app) {
	app.route('/projects')
        .get(projectsController.list)
        .post(users.requiresLogin, projectsController.create);

    app.route('/projects/:projectId')
        .get(projectsController.read)
        .put(users.requiresLogin, projectsController.hasAuthorization, projectsController.update)
        .delete(users.requiresLogin, projectsController.hasAuthorization, projectsController.delete)
        .post(projectsController.doCompile);

    app.param('projectId', projectsController.projectByID);
};
