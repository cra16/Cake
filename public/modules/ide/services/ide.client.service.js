'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('ide').factory('Compile', ['$resource',
    function($resource) {
        return $resource('ide');
    }
]);

angular.module('ide').factory('Projects', ['$resource',
    function ($resource) {
        return $resource('projects/:projectId', {
            projectId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }

]);
