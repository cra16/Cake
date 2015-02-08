/**
 * Created by graceyang on 15. 2. 8..
 */

//Callback to bootstrap Angular AFTER the Google APIs are loaded
window.onGapiLoaded = function() {
    // Monkey patch collaborative string for ng-model compatibility
    Object.defineProperty(gapi.drive.realtime.CollaborativeString.prototype, 'text', {
        set: gapi.drive.realtime.CollaborativeString.prototype.setText,
        get: gapi.drive.realtime.CollaborativeString.prototype.getText
    });

    //This code copied from blockly/core/realtime.js; register Blockly custom types
    var custom = gapi.drive.realtime.custom;
    custom.registerType(Blockly.Block, 'Block');
    Blockly.Block.prototype.id = custom.collaborativeField('id');
    Blockly.Block.prototype.xmlDom = custom.collaborativeField('xmlDom');
    Blockly.Block.prototype.relativeX = custom.collaborativeField('relativeX');
    Blockly.Block.prototype.relativeY = custom.collaborativeField('relativeY');
    custom.setInitializer(Blockly.Block, Blockly.Block.prototype.initialize);

    //Render the login button
    gapi.signin.render('login-button', {
        'width': 'wide',
    });

    //Bootstrap Angular
    if(document.readyState !== 'loading') {
        angular.bootstrap(document, ['zr']);
    }
    else {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['zr']);
        });
    }
}

window.loginCallback = function(authResult) {
    if(authResult['status'] && authResult['status']['signed_in']) {
        if(angular.module('core').navbarScope) {
            angular.module('core').navbarScope.getUser();
        }
        if(window.authDeferred) {
            window.authDeferred.resolve();
            window.authDeferred = null;
        }
    }
    else if(authResult['error'] === 'user_signed_out') {
        if(angular.module('core').navbarScope) {
            angular.module('core').navbarScope.displayName = null;
        }
        if(window.authDeferred) {
            window.authDeferred.reject();
            window.authDeferred = null;
        }
    }
};
angular.module('core').navbarScope = null;
