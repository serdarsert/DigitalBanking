module DigitalBanking.AccountModule {
    'use strict';

    export interface IAccountController extends ng.IScope {
        Vm: AccountController;
    }

    export class AccountController {

        private scope: ng.IScope;

        public Account: Account;
        public Vm: IAccountController;

        constructor(scope: any, id: number, name: string) {
            scope.Vm = this;
        }
    }

    export class Account {
        public Branch: any;
        public ID: number;
        public Name: string;
        public Balance: number;

        constructor(scope: any, id: number, name: string) {
            scope.Vm = this;
            this.ID = id;
            this.Name = name;
        }
    }

    var app = angular.module('AccountModuleApp', []);

    app.controller('AccountController', ["$scope", "id", "name", AccountController]);


    interface IAccountService {
        GetAccounts(): Array<Account>;
        GetAccount(id: number): Account;
    }

    export class AccountService implements IAccountService {
        constructor(private $http: any) {

        }

        public GetAccounts(): Array<Account> {
            return this.$http.get("/api/Accounts")
                .then(function (response) {
                    return response.data;
                });
        }

        public GetAccount(id: number): Account {
            return this.$http.get("/api/Accounts/" + id)
                .then(function (response) {
                    return response.data;
                });
        }
    }
    
    app.service("AccountService", ["$http"]);
};

