import { CreditCardService } from './credit-card.service';
declare class ValidateCreditCardDto {
    cardNumber: string;
}
export declare class CreditCardController {
    private readonly creditCardService;
    constructor(creditCardService: CreditCardService);
    validateCard(validateCardDto: ValidateCreditCardDto): {
        valid: boolean;
        cardType: string;
        error: string | null;
    };
}
export {};
