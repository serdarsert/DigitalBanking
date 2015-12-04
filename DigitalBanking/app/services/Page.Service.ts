module DigitalBanking.Services {
    'use strict';
    export class PageService {
        Title: string;
    }

    angular.module(DigitalBanking.Shared.Constants.AppNames.DigitalBankingApp)
        .service('pageService', PageService);
}