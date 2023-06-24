
import {CreditCardValidator} from "./CreditCardValidation";

let ccv = new CreditCardValidator();

ccv.validate("98764", (result) => {
    console.log(result); // Perform any operation with the result here
});