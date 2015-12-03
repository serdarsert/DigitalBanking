module Validation {
    export interface StringValidator {
        Validate(s: string): boolean;
    }

    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator implements StringValidator {
        Validate(s: string) {
            return lettersRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        Validate(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}