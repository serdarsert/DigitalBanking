module DigitalBanking.Accounts.Filters {

    'use strict';

    export enum CompareCriteriaEnum { GreaterThan, Equals, LessThan }

    export interface IAccountBalanceFilter extends ng.IFilterService {
        (name: "AccountBalanceFilter"): (accounts: Models.IAccount[], criteriaEnum: CompareCriteriaEnum, filterAmount: Shared.Models.IAmount) => Models.IAccount[];
    }

    export function AccountBalanceFilter() {

        return (accounts: Models.IAccount[], criteriaEnum: CompareCriteriaEnum, filterAmount: Shared.Models.IAmount) => {

            var matches: Models.IAccount[] = [];
            for (var i = 0; i < accounts.length; i++) {
                var account = accounts[i];
                if ((criteriaEnum == CompareCriteriaEnum.Equals && account.Balance.Value == filterAmount.Value) ||
                    (criteriaEnum == CompareCriteriaEnum.GreaterThan && account.Balance.Value > filterAmount.Value) ||
                    (criteriaEnum == CompareCriteriaEnum.LessThan && account.Balance.Value < filterAmount.Value))
                    matches.push(account);

            }
            return matches;
        };

    }

    angular.module(Shared.Constants.AppNames.DigitalBankingApp)
        .filter("AccountBalanceFilter", AccountBalanceFilter);
}