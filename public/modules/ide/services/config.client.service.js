/**
 * Created by graceyang on 15. 2. 8..
 */

angular.module('ide').value('config', {
    clientId: '367303615453-0gk3eksc4hfneotrfsg9rk621vmb6jas.apps.googleusercontent.com',
    appId: 367303615453,
    //apiKey: 'i7or9cfoaaeg7vb9apsn068h690bdlkr',
    simpleApiKey: 'AIzaSyA6Ta301zenMkDHWRmii1Tqny_cvBlvM7E',
    scopes: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.install profile email https://www.googleapis.com/auth/admin.directory.group',
    //NO TRAILING SLASH on serviceDomain
    serviceDomain: (window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'http://localhost:3000')
});

