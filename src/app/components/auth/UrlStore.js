/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    var urlStore = function () {

        var savedUrl;
        this.saveUrl = function (url) {
            savedUrl = url;
        };

        this.getUrl = function () {
            return savedUrl;
        };
    };

    angular.module("pandoraApp")
        .service("UrlStore", urlStore);
})();