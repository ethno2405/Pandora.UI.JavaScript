/// <reference path="../angular/angular.js" />

(function () {
    'use strict';

    var pandoraApp = angular.module("pandoraApp");

    pandoraApp.config(["$routeProvider",
    function ($routeProvider) {
        $routeProvider.when("/login", {
            templateUrl: "app/components/login/login.html",
            controller: "LoginController"
        });
    }]);
})();