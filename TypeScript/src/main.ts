
import {CreditCardValidator} from "./CreditCardValidation";

let ccv = new CreditCardValidator();

ccv.validate("370000000000000", (result) => {
    console.log(result); // Perform any operation with the result here
});