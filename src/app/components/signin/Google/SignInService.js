/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .service("SignInService", function () {

            var idTokenKey = "id_token";
            this.setUser = function (user) {
                window.localStorage[idTokenKey] = user;
            };

            this.isLoggedIn = function () {
                var user = window.localStorage[idTokenKey];
                return (user) ? true : false;
            };
        });
})();