module DigitalBanking.Shared.Constants
{
    export class AppNames {
        static DigitalBankingApp: string = "DigitalBankingApp";
    }

    export class FilterNames {
        static AccountBalanceFilter: string = "DigitalBanking.Accounts.Filters.AccountBalanceFilter";
    }

    export class ControllerFullNames {
        static AccountController: string = "DigitalBanking.Accounts.AccountController";
        static LoginController: string = "DigitalBanking.Login.LoginController";
    }

    export class ServiceNames {
        static DataService: string = 'DigitalBanking.Services.DataService';
        static ModalService: string = 'DigitalBanking.Services.ModalService';
    }
}