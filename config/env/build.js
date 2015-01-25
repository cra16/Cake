/**
 * Created by wbqd on 15. 1. 19..
 */
// Include the same assets from all.js, but for the vendor libraries (3rd party),
// include the minimized versions. These will not be minified during the build
// but instead concat together to form 1 vendor js file.
'use strict';

module.exports = {
    assets: {
        lib: {
        	css: [
        		'public/lib/bootstrap/dist/css/bootstrap.min.css'
        	],
        	js: [
                //'public/lib/jquery/dist/jquery.min.js',
                'public/lib/angular/angular.min.js',
                'public/lib/angular-resource/angular-resource.min.js',
                'public/lib/angular-cookies/angular-cookies.min.js',
                'public/lib/angular-animate/angular-animate.min.js',
                'public/lib/angular-touch/angular-touch.min.js',
                'public/lib/angular-sanitize/angular-sanitize.min.js',
                'public/lib/angular-ui-router/release/angular-ui-router.min.js',
                'public/lib/angular-ui-utils/ui-utils.min.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'/*,
                'public/lib/bootstrap/dist/js/bootstrap.min.js'*/
        	]
        },
        css: [
        	'public/modules/**/css/*.css'
        ],
        js: [
        	'public/config.js',
        	'public/application.js',
        	'public/modules/*/*.js',
        	'public/modules/*/*[!tests]*/*.js'
        ]
    }
};
