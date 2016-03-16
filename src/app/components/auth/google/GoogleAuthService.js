/// <reference path="platform.js" />
/// <reference path="../../../../angular/angular.js" />
/// <reference path="../../../app.configuration.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .service("GoogleAuthService", ["$location", "$q", function ($location, $q) {


            var asdf = gapi.signin2.render("google-login", {
                'scope': 'email',
                'width': 200,
                'height': 50,
                'longtitle': true,
                'theme': 'dark'
            });

            debugger;
            function authorize(isImmediate, handler) {
                gapi.auth.authorize({
                    client_id: configuration.clientId,
                    scope: configuration.scopes,
                    immediate: isImmediate
                }, handler);
            }

            var attempts = 0;

            function handleAuthResult(deferred, result) {
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

            this.signOut = function () {
                gapi.auth.signOut();
            };
        }]);
})();