'use strict';

angular.module('ide').controller('IdeController', ['$scope', '$document',
	function($scope, $document) {
		$document.ready(function() {
			Blockly.inject(document.getElementById('blocklyDiv'),
				{
					path: '../',
					toolbox: document.getElementById('toolbox')
				}
			);
			//Blockly.addChangeListener(renderContent);
		});
	}
]);
