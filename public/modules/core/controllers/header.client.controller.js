'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus', 'drive','$timeout', 'config',
	function($scope, Authentication, Menus, drive, $timeout, config) {

        /**
         * Requests authorization from the user. Redirects to the previous target
         * or to create a new doc if no other action once complete.
         */

        $scope.clientId = config.appId;
        $scope.scopes = config.scopes;

		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        $scope.getUser = function() {
            drive.getUser(function(data) {
                $timeout(function() {
                    if(data && data.displayName) {
                        $scope.displayName = data.displayName;
                    }
                    else {
                        $scope.displayName = null;
                    }
                    $scope.showLogin = true;
                });
            });
        };
        $scope.getUser();


        $scope.signOut = function() {
            gapi.auth.signOut();
            $location.path('/');
        }
        gapi.client.setApiKey(config.simpleApiKey);
        //Give global reference for login callback
        angular.module('core').navbarScope = $scope; //필요한 것일까?
	}
]);


