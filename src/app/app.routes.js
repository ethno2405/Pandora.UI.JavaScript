/// <reference path="../angular/angular.js" />

(function () {
    'use strict';

    var pandoraApp = angular.module("pandoraApp");


    pandoraApp.config(["$routeProvider",
        function ($routeProvider) {
            $routeProvider
                .when("/login", {
                    templateUrl: "app/components/login/login.html",
                    controller: "LoginController",
                    publicAccess: true
                })
                .when("/projects", {
                    templateUrl: "app/components/projects/projects.html",
                    controller: "ProjectsController"
                })
                .otherwise("/login");
        }])
        .factory("httpInterceptor", ["$location", "GoogleAuthService", function ($location, GoogleAuthService) {
            return {
                request: function (config) {
                    //var token = GoogleAuthService.getToken();
                    //if (token) {
                    //    config.headers.Authorization = "Bearer " + token.id_token;
                    //}

                    return config;
                },

                requestError: function (config) {
                    return config;
                },

                response: function (res) {
                    return res;
                },

                responseError: function (res) {
                    if (res.status === 401) {
                        $location.path("/login");
                        return;
                    }

                    return res;
                }
            }
        }])
        .config(["$httpProvider", function ($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
        }])
        .run(["$rootScope", "$location", "UrlStore", "GoogleAuthService", "$route",
            function ($rootScope, $location, UrlStore, GoogleAuthService, $route) {

                var routesOpenToPublic = [];
                angular.forEach($route.routes, function (route, path) {
                    route.publicAccess && (routesOpenToPublic.push(path));
                });

                $rootScope.$on('$routeChangeStart', function (event, nextLoc, currentLoc) {
                    var closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
                    if (closedToPublic && !GoogleAuthService.getToken()) {
                        if (nextLoc && nextLoc.originalPath !== "/login") {
                            UrlStore.saveUrl(nextLoc.originalPath);
                        }

                        $location.path('/login');
                    }
                });
            }]);
})();