module DigitalBanking {
    'use strict';

    export class Routes {
        static Configure($routeProvider: ng.route.IRouteProvider) {
            var viewBase: string = 'app/';
            /*
            .state("home", { abstract: true, url: "/home", templateUrl: "/templates/home.html" })
                .state("overview", {
                    parent: "home", url: "/overview", templateUrl: "/templates/overview.html", controller: "OverviewController",
                    resolve: {

                        AccountService: "AccountService",

                        accounts: ["AccountService", (service: AccountModule.AccountService) => {
                            return service.GetAccounts();
                        }]
                    }
                })
                .state("details", {
                    parent: "overview", url: "/account/:id", templateUrl: "/templates/account.html", controller: "AccountController",
                    resolve: {
                        AccountService: "AccountService",

                        id: ["AccountService", "$stateParams", (service: AccountModule.AccountService, $stateParams) => {
                            var accountId = $stateParams.id;
                            return service.GetAccount(accountId);
                        }]
                    }
                })
            */
            $routeProvider
                .when('/login', {
                    controller: Shared.Constants.ControllerFullNames.LoginController,
                    templateUrl: viewBase + 'login/login.html',
                    controllerAs: 'vm'
                })
                .when('/home', {
                    controller: Shared.Constants.ControllerFullNames.AccountController,
                    templateUrl: viewBase + 'accounts/account.html',
                    controllerAs: 'vm'
                })
                .when('/accounts', {
                    controller: Shared.Constants.ControllerFullNames.AccountController,
                    templateUrl: viewBase + 'accounts/account.html',
                    controllerAs: 'vm'
                })
                .when('/account/:accountId', {
                    controller: Shared.Constants.ControllerFullNames.AccountController,
                    templateUrl: viewBase + 'accounts/accountDetail.html',
                    controllerAs: 'vm'
                })
                .otherwise({ redirectTo: '/home' });
        }
    }

}