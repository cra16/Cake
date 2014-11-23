'use strict';

/**
 * Module dependencies.
 */
var compile = require('../../app/controllers/ide.server.controller');

module.exports = function(app) {
	app.route('/ide')
		.post(compile.doCompile);
};
