/// <reference path="../angular/angular.js" />
/// <reference path="components/signin/Google/SignInService.js" />

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
                templateUrl: "app/components/signin/Google/signin.html",
                controller: "SignInController"
            })
            .when("/projects", {
                templateUrl: "app/components/projects/projects.html",
                controller: "ProjectsController",
                resolve: {
                    'auth': function ($q, SignInService) {
                        if (!SignInService.isLoggedIn())
                            return $q.reject("Not Authenticated");
                        return SignInService.isLoggedIn();
                    }
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    }])
    .run(["$rootScope", "$location", "SignInService", function ($rootScope, $location, SignInService) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection === 'Not Authenticated') {
                $location.path('/login');
            }
        });
    }]);
})();