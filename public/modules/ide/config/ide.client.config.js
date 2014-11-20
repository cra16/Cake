'use strict';

// Ide module config
angular.module('ide').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Ide', 'ide', 'item', '/ide', true);
	}
]);
