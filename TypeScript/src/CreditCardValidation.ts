import * as readline from 'readline';


export interface CardType {
    name: string;
    range: string;
    valid_length: number[];
}

export interface ValidationResult {
    cardType: CardType | undefined;
    valid: boolean;
    luhn_valid: boolean;
    length_valid: boolean;
}

export class CreditCardValidator {
    private cardTypes: CardType[];

    constructor() {
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
    
    private getCardType(number: string): CardType | undefined {
        return this.cardTypes.find(cardType => {
            const ranges = cardType.range.split(',').map(part => {
                if (part.includes('-')) {
                    const [start, end] = part.split('-').map(Number);
                    return Array.from({length: end - start + 1}, (_, i) => start + i);
                }
                return [Number(part)];
            }).flat();
            return ranges.some(rangeValue => number.startsWith(rangeValue.toString()));
        }) ?? undefined;
    }

    private isValidLuhn(number: string): boolean {
        const sum = number.split('').reverse().reduce((sum, digit, index) => {
            let num = Number(digit);
            if (index % 2) {
                num *= 2;
                if (num < 10) {
                    return sum + num;
                } else {
                    return sum + num - 9;
                }
            } else {
                return sum + num;
            }
        }, 0);
        return sum % 10 === 0;
    }

    private isValidLength(number: string, cardType: CardType): boolean {
        return cardType.valid_length.includes(number.length);;
    }

    public validateCardNumber(number: string): { cardType: CardType | undefined; valid: boolean; luhn_valid: boolean; length_valid: boolean } {
        const cardType = this.getCardType(number);
        let luhnValid = this.isValidLuhn(number);
        let lengthValid = false;
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
    }


    public validate(number: string, callback: (result: ValidationResult) => void): void {
        number = number.replace(/[ -]/g, '');
        const validationResult = this.validateCardNumber(number);
        if (callback) callback(validationResult);
    }

   public bindValidation(callback: (result: ValidationResult) => void): void {
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.setRawMode) {
            process.stdin.setRawMode(true);
        }

        let cardNumber = '';

        process.stdin.on('data', (input) => {
            const str = input.toString().trim();

            // Exit the process when 'c' is pressed with control key
            if (str === '\u0003') {
                process.exit();
            }

            // Build the card number from input and validate
            cardNumber += str;
            this.validate(cardNumber, callback);
        });
    }
    
}

const cardValidator = new CreditCardValidator();