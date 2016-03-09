/// <reference path="../angular/angular.js" />

(function () {
    'use strict';

    var pandoraApp = angular.module("pandoraApp");

    pandoraApp.config(["$routeProvider",
    function ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "app/components/login/login.html",
                controller: "LoginController"
            })
            .when("/signin-google", {
                templateUrl: "app/components/signin/signin.html",
                controller: "SignInGoogleController"
            })
            .when("/projects", {
                templateUrl: "app/components/projects/projects.html",
                controller: "ProjectsController",
                requireToken: true
            })
            .otherwise({
                redirectTo: '/login'
            });
    }])
    .run(["$rootScope", "$location", "SignInService", function ($rootScope, $location, SignInService) {
        $rootScope.$on('$routeChangeStart', function (event) {

            console.log("asdf");
        });
    }]);
})();