'use strict';

angular.module('ide').controller('IdeController', ['$scope', '$document', '$stateParams', '$location', 'Authentication', 'Projects', 'Compile',
	function($scope, $document, $stateParams, $location, Authentication, Projects, Compile) {

        $scope.authentication = Authentication;

		//Inject workspace after page is loaded.
        $scope.newWorkspace = function() {
            $scope.inject();
            Blockly.Blocks.CreateMainBlock();
        };

        $scope.inject = function() {
            Blockly.inject(document.getElementById('blocklyDiv'),
                {
                    path: '../',
                    toolbox: document.getElementById('toolbox')
                }
            );
            Blockly.addChangeListener(renderContent);
        };

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
/*
        $scope.create = function () {
           var xml = 'xml';
            var title = 'new project';
           // var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
            var project = new Projects({
                //title: this.title,
                title: title,
                content: xml
            });
            project.$save(function (response) {
                $location.path('projects/' + response._id);

                $scope.title = '';
                $scope.content = '';
            });
         };
*/
        $scope.create = function () {

            var title = 'New CAKE Project';

            var project = new Projects({
                title: title,
                content: Blockly.Xml.workspaceToDom(Blockly.mainWorkspace).outerHTML.toString()
            });
            project.$save(function (response) {
                $location.path('projects/' + response._id);

                $scope.title = '';
                $scope.content = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (project) {
            if (project) {
                project.$remove();

                for (var i in $scope.projects) {
                    if ($scope.projects[i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            } else {
                $scope.project.$remove(function () {
                    $location.path('projects');
                });
            }
        };

        $scope.update = function () {
            var project = $scope.project;
            project.content = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace).outerHTML.toString();

            project.$update(function () {
                $location.path('projects/' + project._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.projects = Projects.query();
        };

        $scope.findOne = function () {
            //$scope.project = Projects.get({
            //    projectId: $stateParams.projectId
            //});

            $scope.project = Projects.get({
                projectId: $stateParams.projectId
            }).$promise.then(function (project) {
                    //Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, jQuery.parseXML(project.content));

                    Blockly.mainWorkspace.clear();
                    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, jQuery.parseXML(project.content).childNodes[0]);
                    console.log('project!!!!')
                }, function (errResponse) { });
        };
	}
]);
