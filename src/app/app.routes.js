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
        .run(function ($rootScope, $location, UrlStore, GoogleAuthService, $route) {

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
        });
})();