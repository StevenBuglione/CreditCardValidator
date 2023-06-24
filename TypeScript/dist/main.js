"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreditCardValidation_1 = require("./CreditCardValidation");
let ccv = new CreditCardValidation_1.CreditCardValidator();
ccv.validate("370000000000000", (result) => {
    console.log(result); // Perform any operation with the result here
});
