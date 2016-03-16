/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    var urlStore = function () {

        var savedUrl;
        this.saveUrl = function (url) {
            savedUrl = url;
        };

        this.getUrl = function () {
            var url = savedUrl;
            savedUrl = null;
            return url;
        };
    };

    angular.module("pandoraApp")
        .service("UrlStore", urlStore);
})();