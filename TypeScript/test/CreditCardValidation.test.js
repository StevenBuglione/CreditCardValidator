"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var CreditCardValidation_1 = require("../src/CreditCardValidation");
// @ts-ignore
// @ts-ignore
describe('CreditCardValidator', function () {
    var cards = [
        {
            type: "amex",
            number: "378282246310005"
        },
        {
            type: "amex",
            number: "378734493671000"
        },
        {
            type: "amex",
            number: "370000000000000",
            invalidLuhn: true
        },
        {
            type: "amex",
            number: "3700000",
            invalidLuhn: true,
            invalidLength: true
        },
        {
            type: "discover",
            number: "6011111111111117"
        },
        {
            type: "discover",
            number: "6011000990139424"
        },
        {
            type: "discover",
            number: "6011000990139429",
            invalidLuhn: true
        },
        {
            type: "discover",
            number: "6011000",
            invalidLuhn: true,
            invalidLength: true
        },
        {
            type: "jcb",
            number: "3530111333300000"
        },
        {
            type: "jcb",
            number: "3566002020360505"
        },
        {
            type: "jcb",
            number: "3560000000000000",
            invalidLuhn: true
        },
        {
            type: "jcb",
            number: "356000",
            invalidLuhn: true,
            invalidLength: true
        },
        {
            type: "mastercard",
            number: "5555555555554444"
        },
        {
            type: "mastercard",
            number: "5105105105105100"
        },
        {
            type: "mastercard",
            number: "5105105105105109",
            invalidLuhn: true
        },
        {
            type: "mastercard",
            number: "510500",
            invalidLuhn: true,
            invalidLength: true
        },
        {
            type: "mastercard",
            number: "2221222233334449"
        },
        {
            type: "mastercard",
            number: "2720111111111118"
        },
        {
            type: undefined,
            number: "2721000000000000",
            invalidLuhn: true,
            invalidLength: true
        },
        {
            type: undefined,
            number: "222000000000000",
            invalidLuhn: true,
            invalidLength: true
        },
        {
            type: "visa",
            number: "4111111111111111"
        },
        {
            type: "visa",
            number: "4111111111111112",
            invalidLuhn: true
        },
        {
            type: "visa",
            number: "4012888888881881"
        },
        {
            type: "visa",
            number: "411111",
            invalidLuhn: true,
            invalidLength: true
        },
        {
            type: "visa",
            number: "4556781815037",
            invalidLuhn: false,
            invalidLength: false
        },
        {
            type: "visa",
            number: "4111111111119"
        },
        {
            type: "visa",
            number: "411111111111111118"
        },
        {
            type: "dankort",
            number: "5019717010103742",
            invalidLuhn: false,
            invalidLength: false
        },
        {
            type: "uatp",
            number: "111111111111119"
        },
        {
            type: "uatp",
            number: "11111111111110",
            invalidLength: true
        },
        {
            type: "uatp",
            number: "111111111111112",
            invalidLuhn: true
        },
        {
            type: undefined,
            number: "00000000",
            invalidLength: true
        },
        {
            type: "mir",
            number: "2200381427330087",
            invalidLuhn: false,
            invalidLength: false,
        },
        {
            type: undefined,
            number: "9876",
            invalidLuhn: true,
            invalidLength: true,
        },
        {
            type: undefined,
            number: "98764",
            invalidLuhn: false,
            invalidLength: true,
        }
    ];
    var creditCardValidator = new CreditCardValidation_1.CreditCardValidator();
    cards.forEach(function (card) {
        it("Card number ".concat(card.number), function () {
            var _a;
            var result = creditCardValidator.validateCardNumber(card.number);
            (0, chai_1.expect)((_a = result.cardType) === null || _a === void 0 ? void 0 : _a.name).to.equal(card.type);
            (0, chai_1.expect)(result.luhn_valid).to.equal(!card.invalidLuhn);
            (0, chai_1.expect)(result.length_valid).to.equal(!card.invalidLength);
            (0, chai_1.expect)(result.valid).to.equal(!card.invalidLuhn && !card.invalidLength);
        });
    });
});
