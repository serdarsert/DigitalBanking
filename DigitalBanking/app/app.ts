/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
module DigitalBanking {
    'use strict';
    var app = angular.module(Shared.Constants.AppNames.DigitalBankingApp, ['ngRoute', 'ngAnimate']);


    app.config(['$routeProvider', '$httpProvider',
        ($routeProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider): void  => {
            Routes.Configure($routeProvider);
        }]);
}