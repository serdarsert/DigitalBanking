/// <reference path="../../scripts/typings/angularjs/angular.d.ts" />
module DigitalBanking.Shared.Helpers {
    export class CommonHelper {
        static SetController(module: ng.IModule, controller: any): void {
            var className: string = controller.constructor.toString().match(/\w+/g)[1];
            module.controller(className, controller);
        }
    }
}