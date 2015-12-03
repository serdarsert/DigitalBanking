module DigitalBanking.Shared.Models {
    export interface IAmount {
        Value: number;
        Curreny: ICurrency;
    }

    export interface ICurrency {
        Code: string;
        Name: string;
    }
}