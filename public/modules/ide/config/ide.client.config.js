'use strict';

// Ide module config
angular.module('ide').run(['Menus',
	function(Menus) {
		//Menus.addMenuItem('topbar', 'Ide', 'ide', 'item', '/ide', true);

        //menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position
        Menus.addMenuItem('topbar', 'Projects', 'ide', 'dropdown', '/projects(/create)?');
        Menus.addSubMenuItem('topbar', 'ide', 'List Projects', 'projects');
        Menus.addSubMenuItem('topbar', 'ide', 'New Projects', 'projects/create');
     //       menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position
	}
]);
