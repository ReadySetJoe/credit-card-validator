export declare class CreditCardService {
    validateCreditCard(cardNumber: string): {
        valid: boolean;
        cardType: string;
        error: string | null;
    };
    private luhnCheck;
    private identifyCardType;
    private isValidLength;
}
