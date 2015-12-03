module DigitalBanking.Services {
    'use strict';
    export class DataService {
        factory = {};
        requestDigest: string = null;

        static $inject = ['$http',
            '$q',
            '$window',
            '$location',
            '$timeout'];

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private $window: ng.IWindowService,
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService) {

        }

        GetAccounts() {
            var url = '/Account/';
            return this.$http.get<Accounts.Models.IAccount[]>(url).then((result: ng.IHttpPromiseCallbackArg<Accounts.Models.IAccount[]>) => {
                var accounts: Accounts.Models.IAccount[] = result.data;
                return accounts;
            },
                (error: ng.IHttpPromiseCallbackArg<Accounts.Models.IAccount>) => {
                    this.$window.alert(error.data);
                }
            );
        }


        GetAccount(id: number) {
            var url = '/Account/' + id;
            return this.$http.get<Accounts.Models.IAccount>(url).then((result: ng.IHttpPromiseCallbackArg<Accounts.Models.IAccount>) => {
                var account: Accounts.Models.IAccount = result.data;
                return account;
            },
                (error: ng.IHttpPromiseCallbackArg<Accounts.Models.IAccount>) => {
                    this.$window.alert(error.data);
                }
            );
        }

        DeleteAccount(id: number) {
            var url = '/Account/' + id;

            return this.$http.delete(url).then((status) => {
                return status.data;
            },
                (error: Shared.Interfaces.IHttpPromiseCallbackErrorArg) => {
                    this.$window.alert(error.message);
                    return error;
                });
        }
        /*
        getEmployeeExpenses(id) {
            var url = this.baseSPListsUrl +
                'getByTitle(\'Expenses\')/items?' +
                '$select=ID,Amount,Created,ExpenseCategory,Title,Receipt' +
                '&$filter=Employee eq ' + id;
            var deferred = this.$q.defer();
            var empPromise = this.getEmployee(id);
            var expensesPromise = this.$http.get(url, this.getOptions);

            this.$q.all([empPromise, expensesPromise])
                .then((results) => {
                    var employee = results[0]; //Get customer data
                    employee.expenses = this.caseProps(results[1].data.d.results, this.PropStyle.camelCase); //Get expenses data

                    this.calculateExpensesTotal(employee);

                    deferred.resolve(employee);
                },
                (error) => {
                    if (error.status === 302) {
                        deferred.resolve(null);
                    }
                });

            return deferred.promise; //Return promise to caller

        }

        insertEmployee(employee) {

            employee = this.caseProps(employee, this.PropStyle.pascalCase);
            employee.Title = employee.FirstName + ' ' + employee.LastName;
            employee.Zip = employee.Zip.toString(); //Zip is a string in SharePoint
            employee.__metadata = { type: 'SP.Data.EmployeesListItem' };
            var baseUrl: string = this.baseSPListsUrl + 'getByTitle(\'Employees\')/items';

            var options = {
                url: baseUrl,
                method: 'POST',
                data: JSON.stringify(employee),
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose'
                }
            };

            return this.$http(options).then((result: shared.IHttpDataResponse) => {
                var cust: shared.IEmployee = this.caseProps(result.data.d, this.PropStyle.camelCase);
                cust.zip = parseInt(cust.zip, 10); //SharePoint Zip field is a string so convert to int
                return cust;
            },
                (error: shared.IHttpPromiseCallbackErrorArg) => {
                    this.$window.alert(error.message);
                    return error;
                });
        }

        updateEmployee(employee) {

            employee = this.caseProps(employee, this.PropStyle.pascalCase);
            employee.Title = employee.FirstName + ' ' + employee.LastName;
            employee.Zip = employee.Zip.toString(); //Zip is a string in SharePoint

            var options = {
                url: employee.__metadata.uri,
                method: 'MERGE',
                data: JSON.stringify(employee),
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'Content-Type': 'application/json;odata=verbose',
                    'If-Match': employee.__metadata.etag
                }
            };

            return this.$http(options).then((employeeData) => {
                if (employeeData.config && employeeData.config.data) {
                    var employee: shared.IEmployee = JSON.parse(employeeData.config.data);
                    //etag returned is the same one sent up so have to manually increment it to
                    //stay insync. This makes it so we don't have to grab a fresh employee object
                    //from the server each time an update occurs...save an XHR call.
                    var etag = parseInt(employee.__metadata.etag.replace('"', ''), 10) + 1;
                    var metadata = employee.__metadata;
                    metadata.etag = '"' + etag + '"';
                    return metadata;
                }
                return null;
            });

        }

        getRequestDigest() {
            var baseUrl = this.baseSPUrl + 'contextinfo';
            var options = {
                url: baseUrl,
                method: 'POST',
                headers: {
                    'Accept': 'application/json;odata=verbose',
                    'ContextInfoRequest': true
                }
            };

            this.$http(options).success((data: shared.IHttpDataDResponse) => {
                if (data && data.d) {
                    this.requestDigest = data.d.GetContextWebInformation.FormDigestValue;
                }
            });
        }

        mapEmployeeToExpenses(employees, expenses) {
            if (employees && expenses) {
                for (var i = 0; i < employees.length; i++) {
                    var employee = employees[i];
                    var employeeExpenses = [];
                    for (var j = 0; j < expenses.length; j++) {
                        var expense = expenses[j];
                        if (expense.employee.Id === employee.id) { //Case of "Id" is correct for this instance
                            employeeExpenses.push(expense);
                        }
                    }
                    employee.expenses = employeeExpenses;
                    this.calculateExpensesTotal(employee);
                }
            }
        }
        */
    }


    angular.module(DigitalBanking.Shared.Constants.AppNames.DigitalBankingApp)
        .service(DigitalBanking.Shared.Constants.ServiceNames.DataService, DataService);

}
