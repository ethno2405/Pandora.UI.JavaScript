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
                    'currentUser': function (CurrentUserService) {
                        return CurrentUserService.getCurrentUseer();
                    }
                }
            })
            .otherwise({
                redirectTo: '/login'
            });
    }])
    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push('OAuthInterceptor');
    }])
    .run(["$rootScope", "$location", "SignInService", function ($rootScope, $location, SignInService) {
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
            if (rejection === 'Not Authenticated') {
                $location.path('/login');
            }
        });
    }])
    .factory("OAuthInterceptor", ["$rootScope", "SignInService", function ($rootScope, SignInService) {
        var oauthInterceptor = {
            request: function (config) {

                if (!SignInService.isLoggedIn()) {
                    return config;
                }

                var currentUser = SignInService.getUser();

                config.headers.Authorization = "Bearer " + currentUser;
                //config.headers["Content-Type"] = "application/json";

                return config;
            },

            responseError: function (response) {
                if (response.status === 401) {
                    $rootScope.$broadcast('Not Authenticated');
                }

                return response;
            }
        }

        return oauthInterceptor;
    }])
    .factory("CurrentUserService", ["$q", "SignInService", function ($q, SignInService) {
        return {
            getCurrentUseer: function () {
                if (!SignInService.isLoggedIn())
                    return $q.reject("Not Authenticated");
                return SignInService.getUser();
            }
        }
    }]);
})();