/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("SignInController", ["$location", "$routeParams", "SignInService", function ($location, $routeParams, SignInService) {

            debugger;
            var idToken = $routeParams.id_token;

            if (!idToken) {
                $location.path("/login");
                return;
            }

            SignInService.setUser(idToken);

            $location.search({});
            $location.path("/projects");
        }]);
})();