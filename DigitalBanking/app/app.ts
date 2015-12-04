/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
module DigitalBanking {
    'use strict';
    var app = angular.module(Shared.Constants.AppNames.DigitalBankingApp, ['ngRoute', 'ngAnimate','ngMaterial']);


    app.config(['$routeProvider', '$httpProvider',
        ($routeProvider: ng.route.IRouteProvider, $httpProvider: ng.IHttpProvider): void  => {
            Routes.Configure($routeProvider);

            $httpProvider.interceptors.push(function ($q, $rootScope) {
                return {
                    'request': function (config) {
                        $rootScope.$broadcast('loading-started');
                        return config || $q.when(config);
                    },
                    'response': function (response) {
                        if (response.config.transformResponse.length > 0)
                            $rootScope.$broadcast('loading-complete');
                        return response || $q.when(response);
                    }
                };
            });

        }]);

    app.directive("loadingIndicator", function () {
        return {
            restrict: "A",
            template: "<div>Loading...</div>",
            link: function (scope, element, attrs) {
                scope.$on("loading-started", function (e) {
                    element.css({ "display": "" });
                });
                scope.$on("loading-complete", function (e) {
                    element.css({ "display": "none" });
                });
            }
        };
    });
}