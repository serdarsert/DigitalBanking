interface ITransaction {
    Fetch(request: RequestBase, response: any): void;
    Execute(request: RequestBase, response: any): void;
}

class RequestBase
{
    
}

class TransactionHeader {
    SessionID: string;
}