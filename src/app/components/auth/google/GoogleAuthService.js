/// <reference path="google-oauth2-api.js" />
/// <reference path="../../../../angular/angular.js" />
/// <reference path="../../../app.configuration.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .service("GoogleAuthService", ["$location", "$q", function ($location, $q) {

            gapi.client.setApiKey(configuration.apiKey);

            function authorize(isImmediate, handler) {
                gapi.auth.authorize({
                    client_id: configuration.clientId,
                    scope: configuration.scopes,
                    immediate: isImmediate
                }, handler);
            }

            var attempts = 0;

            function handleAuthResult(deferred, result) {
                debugger;
                if (attempts > 5) {
                    attempts = 0;
                    deferred.reject(false);
                    return;
                }

                attempts++;
                if (result && !result.error) {
                    deferred.resolve(true);
                } else {
                    authorize(false, function (result) {
                        handleAuthResult(deferred, result);
                    });
                }
            }

            this.authorize = function () {

                var deferred = $q.defer();

                authorize(true, function (result) {
                    handleAuthResult(deferred, result);
                });

                return deferred.promise;
            };

            this.getToken = function () {
                return gapi.auth.getToken();
            };
        }]);
})();