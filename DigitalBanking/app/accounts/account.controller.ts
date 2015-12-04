module DigitalBanking.Accounts {

    interface IPagingInfo {
        currentPage: number;
        totalRecords: number;
        pageStart: number;
        pageEnd: number;
        pagedEmployeeLength: number;
        numRecordsDisplaying: number;
    }

    class AccountController {

        accounts: Models.IAccount[] = [];
        filteredAccounts: Models.IAccount[] = [];
        pagedAccounts: Models.IAccount[] = [];
        filteredCount: number = 0;
        orderby: string = 'balance';
        reverse: boolean = false;
        searchText: string = null;
        accountBalanceFilterValue: Shared.Models.IAmount = null;
        cardAnimationClass: string = 'card-animation';
        listDisplayModeEnabled: boolean;
        pagingInfo: IPagingInfo;
        DisplayMode = {
            Card: 0,
            List: 1
        };
        SelectedAccount: Models.IAccount;

        //paging
        totalRecords: number = 0;
        pageSize: number = 10;
        currentPage: number = 1;
        numRecordsDisplaying: number;

        static $inject = ['$scope', '$rootScope', '$location',
            '$filter',
            '$routeParams',
            '$window',
            '$timeout',
            'dataService'
        ];

        constructor(
            private $scope: ng.IScope,
            private $rootScope: ng.IRootScopeService,
            private $location: ng.ILocationService,
            private $filter: Filters.IAccountBalanceFilter,
            private $routeParams: Models.IAccountRouteParams,
            private $window: ng.IWindowService,
            private $timeout: ng.ITimeoutService,
            private dataService: Services.DataService,
            private pageService: Services.PageService,
            private modalService: Services.ModalService) {
            //pageService.Title = "Hesaplar";
            if ($routeParams.accountId != undefined)
            {
                var id = (this.$routeParams.accountId) ? parseInt(this.$routeParams.accountId, 10) : 0;
                this.GetAccount(id);
            }
            else
                this.getAccountsSummary();
        }



        pageChanged(page) {
            this.currentPage = page;
            this.pageRecords();
        }

        DeleteAccount(id) {
            var acc = this.GetAccountById(id);

            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Account',
                headerText: 'Delete ' + acc.Id + ' - ' + acc.Name + '?',
                bodyText: 'Are you sure you want to delete this account?'
            };

            this.modalService.ShowModal({}, modalOptions).then((result) => {
                if (result === 'ok') {
                    this.dataService.DeleteAccount(acc.Id).then(() => {
                        for (var i = 0; i < this.accounts.length; i++) {
                            if (this.accounts[i].Id === id) {
                                this.accounts.splice(i, 1);
                                break;
                            }
                        }
                        //this.filterAccounts();
                    }, (error) => {
                        this.$window.alert('Error deleting account: ' + error.message);
                    });
                }
            });
        }

        ChangeDisplayMode(displayMode) {
            switch (displayMode) {
                case this.DisplayMode.Card:
                    this.listDisplayModeEnabled = false;
                    break;
                case this.DisplayMode.List:
                    this.listDisplayModeEnabled = true;
                    break;
            }
        }

        navigate(url) {
            this.$location.path(url);
        }

        setOrder(orderby) {
            if (orderby === this.orderby) {
                this.reverse = !this.reverse;
            }
            this.orderby = orderby;
        }

        searchTextChanged() {
            this.filterAccounts();
        }

        getAccountsSummary() {
            this.dataService.GetAccounts()
                .then((data) => {
                    this.accounts = data;
                    this.filterAccounts();

                    this.$timeout(() => {
                        this.cardAnimationClass = ''; //Turn off animation
                    }, 1000);

                }, (error: Shared.Interfaces.IHttpPromiseCallbackErrorArg) => {
                    this.$window.alert('Sorry, an error occurred: ' + error.data.message);
                });
        }

        GetAccount(id: number) {
            var account: Models.IAccount;
            this.dataService.GetAccount(id)
                .then((data) => {
                    this.SelectedAccount = data;

                    this.$timeout(() => {
                        this.cardAnimationClass = ''; //Turn off animation
                    }, 1000);

                }, (error: Shared.Interfaces.IHttpPromiseCallbackErrorArg) => {
                    this.$window.alert('Sorry, an error occurred: ' + error.data.message);
                });
        }

        filterAccounts() {
            this.filteredAccounts = this.$filter("AccountBalanceFilter")(this.accounts, Filters.CompareCriteriaEnum.GreaterThan, this.accountBalanceFilterValue);
            this.filteredCount = this.filteredAccounts.length;

            //Factor in paging
            this.currentPage = 1;
            this.totalRecords = this.filteredCount;
            this.pageRecords();
        }

        pageRecords() {
            var useFiltered = this.searchText && this.searchText.length > 0,
                pageStart = (this.currentPage - 1) * this.pageSize,
                pageEnd = pageStart + this.pageSize;

            if (useFiltered) {
                if (pageEnd > this.filteredCount) {
                    pageEnd = this.filteredCount;
                }
            } else {
                if (pageEnd > this.accounts.length) {
                    pageEnd = this.accounts.length;
                }
                this.totalRecords = this.accounts.length;
            }

            this.pagedAccounts = (useFiltered) ? this.filteredAccounts.slice(pageStart, pageEnd)
                : this.accounts.slice(pageStart, pageEnd);
            this.numRecordsDisplaying = this.pagedAccounts.length;
            this.pagingInfo = {
                currentPage: this.currentPage,
                totalRecords: this.totalRecords,
                pageStart: pageStart,
                pageEnd: pageEnd,
                pagedEmployeeLength: this.pagedAccounts.length,
                numRecordsDisplaying: this.numRecordsDisplaying
            };
        }

        GetAccountById(id: number) {
            for (var i = 0; i < this.accounts.length; i++) {
                var acc = this.accounts[i];
                if (acc.Id === id) {
                    return acc;
                }
            }
            return null;
        }

    }

    angular.module(DigitalBanking.Shared.Constants.AppNames.DigitalBankingApp)
        .controller(DigitalBanking.Shared.Constants.ControllerFullNames.AccountController, AccountController);

}