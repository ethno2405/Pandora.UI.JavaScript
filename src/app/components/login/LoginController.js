/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("LoginController", ["$scope", "$location", function ($scope, $location) {

            $scope.model = {};
            $scope.model.username = "";
            $scope.model.password = "";
            $scope.model.rememberMe = false;

            $scope.signIn = function (model) {
                $location.path("/projects");
            };

        }]);
})();