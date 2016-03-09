/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .service("LoginService", [function () {

            this.getToken = function () {

                var authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
                var client_id = '207129669458-961vrfl89vptuuv2v696hhk5udqt5ves.apps.googleusercontent.com';
                var redirect_uri = 'http://web.pandora.com:4444/login';
                var scope = "https://www.googleapis.com/auth/plus.login openid profile email";
                var state = Date.now() + "" + Math.random();
                localStorage["state"] = state;
                var url =
                    authorizationUrl + "?" +
                    "client_id=" + encodeURI(client_id) + "&" +
                    "response_type=token id_token&" +
                    "scope=" + encodeURI(scope) + "&" +
                    "state=" + encodeURI(state) + "&" +
                    "nonce=" + encodeURI(state) + "&" +
                    "redirect_uri=" + encodeURI(redirect_uri);

                window.location = url;
            };
        }]);
})();