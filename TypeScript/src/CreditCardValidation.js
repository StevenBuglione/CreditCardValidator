"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardValidator = void 0;
var readline = require("readline");
var CreditCardValidator = /** @class */ (function () {
    function CreditCardValidator() {
        this.cardTypes = [
            {
                name: 'amex',
                range: '34,37',
                valid_length: [15]
            },
            {
                name: 'diners_club_carte_blanche',
                range: '300-305',
                valid_length: [16, 17, 18, 19]
            },
            {
                name: 'diners_club_international',
                range: '3095, 36, 38-39',
                valid_length: [14, 15, 16, 17, 18, 19]
            },
            {
                name: 'jcb',
                range: '3088-3094, 3096-3102, 3112-3120, 3158-3159, 3337-3349, 3528-3589',
                valid_length: [16]
            },
            {
                name: 'laser',
                range: '6304, 6706, 6709, 6771',
                valid_length: [16, 17, 18, 19]
            },
            {
                name: 'visa_electron',
                range: '4026, 417500, 4508, 4844, 4913, 4917',
                valid_length: [16]
            },
            {
                name: 'visa',
                range: '4',
                valid_length: [13, 14, 15, 16, 17, 18, 19]
            },
            {
                name: 'mastercard',
                range: '51-55,2221-2720',
                valid_length: [16]
            },
            {
                name: 'discover',
                range: '6011, 622126-622925, 644-649, 65',
                valid_length: [16, 17, 18, 19]
            },
            {
                name: 'dankort',
                range: '5019',
                valid_length: [16]
            },
            {
                name: 'maestro',
                range: '50, 56-69',
                valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
            },
            {
                name: 'uatp',
                range: '1',
                valid_length: [15]
            },
            {
                name: 'mir',
                range: '2200-2204',
                valid_length: [16]
            }
        ];
    }
    CreditCardValidator.prototype.getCardType = function (number) {
        var _a;
        return (_a = this.cardTypes.find(function (cardType) {
            var ranges = cardType.range.split(',').map(function (part) {
                if (part.includes('-')) {
                    var _a = part.split('-').map(Number), start_1 = _a[0], end = _a[1];
                    return Array.from({ length: end - start_1 + 1 }, function (_, i) { return start_1 + i; });
                }
                return [Number(part)];
            }).flat();
            return ranges.some(function (rangeValue) { return number.startsWith(rangeValue.toString()); });
        })) !== null && _a !== void 0 ? _a : undefined;
    };
    CreditCardValidator.prototype.isValidLuhn = function (number) {
        var sum = number.split('').reverse().reduce(function (sum, digit, index) {
            var num = Number(digit);
            if (index % 2) {
                num *= 2;
                if (num < 10) {
                    return sum + num;
                }
                else {
                    return sum + num - 9;
                }
            }
            else {
                return sum + num;
            }
        }, 0);
        return sum % 10 === 0;
    };
    CreditCardValidator.prototype.isValidLength = function (number, cardType) {
        return cardType.valid_length.includes(number.length);
        ;
    };
    CreditCardValidator.prototype.validateCardNumber = function (number) {
        var cardType = this.getCardType(number);
        var luhnValid = this.isValidLuhn(number);
        var lengthValid = false;
        if (cardType != null) {
            lengthValid = this.isValidLength(number, cardType);
            luhnValid = this.isValidLuhn(number);
        }
        return {
            cardType: cardType,
            valid: luhnValid && lengthValid,
            luhn_valid: luhnValid,
            length_valid: lengthValid
        };
    };
    CreditCardValidator.prototype.validate = function (number, callback) {
        number = number.replace(/[ -]/g, '');
        var validationResult = this.validateCardNumber(number);
        if (callback)
            callback(validationResult);
    };
    CreditCardValidator.prototype.bindValidation = function (callback) {
        var _this = this;
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }
        var cardNumber = '';
        process.stdin.on('data', function (input) {
            var str = input.toString().trim();
            // Exit the process when 'c' is pressed with control key
            if (str === '\u0003') {
                process.exit();
            }
            // Build the card number from input and validate
            cardNumber += str;
            _this.validate(cardNumber, callback);
        });
    };
    return CreditCardValidator;
}());
exports.CreditCardValidator = CreditCardValidator;
var cardValidator = new CreditCardValidator();
