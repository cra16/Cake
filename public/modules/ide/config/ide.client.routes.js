'use strict';

//Setting up route
angular.module('ide').config(['$stateProvider',
	function($stateProvider) {
		// Ide state routing
		$stateProvider.
		state('ide', {
			url: '/ide',
			templateUrl: 'modules/ide/views/ide.client.view.html'
		});
	}
]);