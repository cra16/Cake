'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('ide').factory('Compile', ['$resource',
    function($resource) {
        return $resource('ide');
    }
]);
