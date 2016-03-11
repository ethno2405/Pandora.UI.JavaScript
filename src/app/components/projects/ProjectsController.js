(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("ProjectsController", ["$http", function ($http) {
            var asdf = $http.get("http://api.pandora.com:5000/api/projects")
                .success(function (data) {
                })
                .error(function (error) {
                });
        }]);
})();