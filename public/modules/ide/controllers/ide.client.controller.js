'use strict';

angular.module('ide').controller('IdeController', ['$scope', '$document', 'Compile',
	function($scope, $document, Compile) {
		// Inject workspace after page is loaded.
		$document.ready(function() {
			Blockly.inject(document.getElementById('blocklyDiv'),
				{
					path: '../',
					toolbox: document.getElementById('toolbox')
				}
			);
			Blockly.addChangeListener(renderContent);
		});

		// Render contents with pretty print.
		var renderContent = function () {
			var content = document.getElementById('code');
			var code = Blockly.cake.workspaceToCode();
			content.textContent = code;
			if (typeof prettyPrintOne === 'function') {
				code = content.innerHTML;
				code = prettyPrintOne(code, 'c');
				content.innerHTML = code;
			}
		};

		$scope.compile = function() {
			$scope.code = Compile.get();
			console.log($scope.code);
		};
	}
]);
