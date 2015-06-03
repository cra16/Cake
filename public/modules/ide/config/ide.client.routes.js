'use strict';

//Setting up route
/*
angular.module('ide').config(['$stateProvider',
	function($stateProvider) {
		// Ide state routing
		$stateProvider.
		state('ide', {
			url: '/ide',
			templateUrl: 'modules/ide/views/update-ide.client.view.html'
		});
	}
]);
    */

angular.module('ide').config(['$stateProvider',
    function($stateProvider) {
        // Ide state routing
        $stateProvider.
            state('listProjects', {
                url: '/projects',
                templateUrl: 'modules/ide/views/list-ide.client.view.html'
            }).
        state('createProject', {
                url: '/projects/create',
                templateUrl: 'modules/ide/views/create-ide.client.view.html'
            }).
            state('editProject', {
                url: '/projects/:projectId',
                templateUrl: 'modules/ide/views/update-ide.client.view.html'
            });
    }
]);
