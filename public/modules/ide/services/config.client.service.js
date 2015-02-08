/**
 * Created by graceyang on 15. 2. 8..
 */

angular.module('ide').value('config', {
    clientId: '879485874474-0v132vou67l4vrbbv7vj4oab7pib002v.apps.googleusercontent.com',
    appId: 879485874474,
    //apiKey: 'i7or9cfoaaeg7vb9apsn068h690bdlkr',
    simpleApiKey: 'AIzaSyC8EEpbc9_T1BYrhNFfNoVOun2PYjgz5rg',
    scopes: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install profile email https://www.googleapis.com/auth/admin.directory.group',
    //NO TRAILING SLASH on serviceDomain
    serviceDomain: (window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://localhost:3000')
});

