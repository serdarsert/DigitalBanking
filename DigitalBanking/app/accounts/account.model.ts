module DigitalBanking.Accounts.Models {
    export interface IAccount {
        Id: number;
        Name: string,
        IBAN: string;
        Balance: Shared.Models.IAmount;
        Type: AccountTypeEnum;
    }


    export enum AccountTypeEnum {
        Deposit, Saving
    }
}

