/**
 * Created by graceyang on 15. 2. 8..
 */

angular.module('core').config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //Cake backend auth filter
    $httpProvider.interceptors.push(['$q', function($q) {
        return {
            request: function(config) {
                if(gapi && gapi.auth && typeof gapi.auth.getToken === 'function' && gapi.auth.getToken() !== null) {
                    config.headers['authorization'] = gapi.auth.getToken().access_token;
                }
                return config;
            }
        };
    }]);
}])
