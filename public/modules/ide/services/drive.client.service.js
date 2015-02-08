/**
 * Created by graceyang on 15. 2. 8..
 */

/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

//Handles Drive files and APIs.
//angular.module('ide').service('drive', ['config', '$modal', 'zrdb',
//
//        function (config, $modal, zrdb) {

var ide = angular.module('ide');
ide.service('drive', ['config', '$modal',

        function (config, $modal) {

            //Renames the current file in Drive.
            this.renameFile = function(title, id, callback) {
                gapi.client.request({
                    'path': '/drive/v2/files/' + id,
                    'method': 'PUT',
                    'params': {
                        'fields': '',
                        'key': config.apiKey
                    },
                    'body': JSON.stringify({
                        title: title
                    })
                }).execute(function(){
                    fileMetadata[id] = null;
                    callback();
                });
            };

            var fileMetadata = {};
            //Gets the metadata of a file in Drive.
            this.getFileMetadata = function(id, callback) {
                if(fileMetadata[id]) {
                    callback(fileMetadata[id]);
                    return;
                }
                else {
                    gapi.client.request({
                        'path': '/drive/v2/files/' + id,
                        'method': 'GET'
                    }).execute(function(data) {
                        fileMetadata[id] = data;
                        callback(data);
                    });
                }
            };

            var me = null;
            this.getUser = function(callback) {
                var token = gapi.auth.getToken();
                console.log('get user : ', token);
                if(token && token.status.signed_in) {
                    if(me) {
                        callback(me);
                        return;
                    }
                    else {
                        gapi.client.request({
                            'path': '/plus/v1/people/me',
                            'method': 'GET'
                        }).execute(function(data){
                            me = data;
                            callback(data);
                        });
                    }
                }
                else {
                    me = null;
                    callback(null);
                }
            };

            //Opens new project modal.
            this.newProject = function(folder, saveAsData) {
                $modal.open({
                    templateUrl: 'modules/ide/views/new-project-modal.client.view.html',
                    controller: 'NewProjectModalController',
                    resolve: {
                        folder: function() { return folder; },
                        //gameResources: function() {
                        //    return zrdb.getAllResources('game');
                        //},
                        saveAsData: function() { return saveAsData; }
                    }
                });
            };

            this.openProject = function(callback) {
                var pickerCallback = function(data) {
                    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                        var doc = data[google.picker.Response.DOCUMENTS][0];
                        var id = doc[google.picker.Document.ID];
                        var name = doc[google.picker.Document.NAME];
                        callback(id, name);
                    }
                };
                var showPicker = function() {
                    var picker = new google.picker.PickerBuilder().
                        enableFeature(google.picker.Feature.NAV_HIDDEN).
                        hideTitleBar().
                        setOrigin(window.location.protocol + '//' + window.location.host).
                        setAppId(config.appId).
                        setOAuthToken(gapi.auth.getToken().access_token).
                        addView(new google.picker.DocsView().
                            setParent('root').
                            setMode(google.picker.DocsViewMode.LIST).
                            setIncludeFolders(true).
                            setMimeTypes('application/vnd.google-apps.drive-sdk.' + config.appId)).
                        setCallback(pickerCallback).
                        build();
                    picker.setVisible(true);
                }
                if(!window.google || !window.google.picker) {
                    gapi.load('picker', {"callback" : showPicker});
                }
                else {
                    showPicker();
                }
            };
        }]
);

