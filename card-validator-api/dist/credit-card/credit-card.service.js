"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardService = void 0;
const common_1 = require("@nestjs/common");
let CreditCardService = class CreditCardService {
    validateCreditCard(cardNumber) {
        const sanitizedNumber = cardNumber.replace(/\D/g, '');
        if (!/^\d+$/.test(sanitizedNumber)) {
            return {
                valid: false,
                cardType: 'Unknown',
                error: 'Card number must contain only digits',
            };
        }
        const cardType = this.identifyCardType(sanitizedNumber);
        if (!this.isValidLength(sanitizedNumber, cardType)) {
            return {
                valid: false,
                cardType,
                error: 'Invalid card length',
            };
        }
        const isValid = this.luhnCheck(sanitizedNumber);
        return {
            valid: isValid,
            cardType,
            error: isValid ? null : 'Failed Luhn checksum',
        };
    }
    luhnCheck(cardNumber) {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    }
    identifyCardType(cardNumber) {
        if (/^4/.test(cardNumber)) {
            return 'Visa';
        }
        if (/^5[1-5]/.test(cardNumber) ||
            /^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))/.test(cardNumber)) {
            return 'Mastercard';
        }
        if (/^3[47]/.test(cardNumber)) {
            return 'American Express';
        }
        if (/^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d\d|9(?:[01]\d|2[0-5])))/.test(cardNumber)) {
            return 'Discover';
        }
        if (/^35/.test(cardNumber)) {
            return 'JCB';
        }
        if (/^3(?:0[0-5]|[68])/.test(cardNumber)) {
            return 'Diners Club';
        }
        return 'Unknown';
    }
    isValidLength(cardNumber, cardType) {
        const length = cardNumber.length;
        switch (cardType) {
            case 'Visa':
                return length === 13 || length === 16 || length === 19;
            case 'Mastercard':
                return length === 16;
            case 'American Express':
                return length === 15;
            case 'Discover':
                return length === 16 || length === 19;
            case 'JCB':
                return length === 16 || length === 19;
            case 'Diners Club':
                return length === 14 || length === 16 || length === 19;
            default:
                return length >= 13 && length <= 19;
        }
    }
};
exports.CreditCardService = CreditCardService;
exports.CreditCardService = CreditCardService = __decorate([
    (0, common_1.Injectable)()
], CreditCardService);
//# sourceMappingURL=credit-card.service.js.map