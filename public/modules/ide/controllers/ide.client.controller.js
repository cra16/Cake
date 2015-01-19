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
			//$scope.value = true;
			//$scope.code = Compile.get();
			//console.log($scope.code);
			//$scope.code = '';
			//Blockly.cake.workspaceToCode() = Compile.get();
			//console.log(code);
			var code = new Compile({
				content: Blockly.cake.workspaceToCode()
			});
			code.$save(function(response) {
				$scope.terminal = response.content;
				console.log($scope.terminal);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		/**
		 * Discard all blocks from the workspace.
		 */
		$scope.discard = function() {
			var count = Blockly.mainWorkspace.getAllBlocks().length;
			if (count < 2 || window.confirm('Remove all blocks?')) {
				Blockly.mainWorkspace.clear();
				window.location.hash = '';
			}
		};

		/**
		 * Save current codes into a *.c file.
		 * https://github.com/eligrey/FileSaver.js
		 */
		$scope.downloadCode = function() {
			var code = Blockly.cake.workspaceToCode();
			var codeArray = [];
			codeArray.push(code);
			var codeBlob = new Blob(codeArray, {type: 'text/plain;charset=utf-8'});
			saveAs(codeBlob, 'your_code.c');
		};
	}
]);
