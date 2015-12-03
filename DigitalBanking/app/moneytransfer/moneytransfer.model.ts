module DigitalBanking.MoneyTransfer.Models {
    import acc = Accounts.Models;
    export class MoneyTransferTransaction {
        Execute(request: MoneyTransferRequest): MoneyTransferResponse {
            var response = new MoneyTransferResponse();
            return response;
        }
    }

    export class MoneyTransferRequest {
        FromAccount: acc.IAccount;
        ToAccount: acc.IAccount;
        TransferAmount: Shared.Models.IAmount;
    }

    export class MoneyTransferResponse {

    }
}