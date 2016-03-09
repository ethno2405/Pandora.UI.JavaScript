/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("SignInGoogleController", ["$location", "$routeParams", "SignInService", function ($location, $routeParams, SignInService) {

            var idToken = $routeParams.id_token;

            if (!idToken) {
                $location.path("/login");
                return;
            }

            SignInService.setUser(idToken);
            $location.path("/projects");
        }]);
})();