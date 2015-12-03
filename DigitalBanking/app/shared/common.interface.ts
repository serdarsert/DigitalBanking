module DigitalBanking.Shared.Interfaces {

    export interface IState {
        title: string;
    }

    export interface IHttpDataResponse extends ng.IHttpPromiseCallbackArg<any> {
        data: any;
    }

    export interface IHttpDataDResponse extends ng.IHttpPromiseCallbackArg<any> {
        d: any;
    }

    

    export interface IExpense {
        id?: number;
        title?: string;
        amount?: number;
        expenseCategory?: string;
        receipt?: string;
        __metadata?: any;
    }

    export interface IReceipt {
        id?: string;
        name?: string;
        webUrl?: string;
    }

    export interface IHttpPromiseCallbackErrorArg extends ng.IHttpPromiseCallbackArg<any> {
        message: string;
    }

}