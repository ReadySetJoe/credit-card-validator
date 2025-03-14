import { Injectable } from '@nestjs/common';

@Injectable() // TODO: what's this?
export class CreditCardService {
  /**
   * Validates a credit card number using the Luhn algorithm
   * @param cardNumber The credit card number to validate
   * @returns An object containing the validation result and card type
   */
  validateCreditCard(cardNumber: string) {
    // Remove any non-digit characters
    const sanitizedNumber = cardNumber.replace(/\D/g, '');

    // Check if the input contains only digits after sanitization
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

  /**
   * Implements the Luhn algorithm (mod 10) checksum
   * @param cardNumber The credit card number
   * @returns true if the card number passes the Luhn check
   */
  private luhnCheck(cardNumber: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    // Start from the rightmost digit and move left
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

    // If the sum is divisible by 10, the number is valid
    return sum % 10 === 0;
  }

  /**
   * Identifies the credit card type based on first digits
   * @param cardNumber The credit card number
   * @returns The card type as a string
   */
  private identifyCardType(cardNumber: string): string {
    // Visa: Starts with 4
    if (/^4/.test(cardNumber)) {
      return 'Visa';
    }

    // Mastercard: Starts with 51-55 or 2221-2720
    if (
      /^5[1-5]/.test(cardNumber) ||
      /^2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))/.test(cardNumber)
    ) {
      return 'Mastercard';
    }

    // American Express: Starts with 34 or 37
    if (/^3[47]/.test(cardNumber)) {
      return 'American Express';
    }

    // Discover: Starts with 6011, 622126-622925, 644-649, or 65
    if (
      /^6(?:011|5|4[4-9]|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d\d|9(?:[01]\d|2[0-5])))/.test(
        cardNumber,
      )
    ) {
      return 'Discover';
    }

    // JCB: Starts with 35
    if (/^35/.test(cardNumber)) {
      return 'JCB';
    }

    // Diners Club: Starts with 36, 38, or 300-305
    if (/^3(?:0[0-5]|[68])/.test(cardNumber)) {
      return 'Diners Club';
    }

    return 'Unknown';
  }

  /**
   * Checks if the card number length is valid for its type
   * @param cardNumber The credit card number
   * @param cardType The identified card type
   * @returns true if the length is valid for the card type
   */
  private isValidLength(cardNumber: string, cardType: string): boolean {
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
        return length >= 13 && length <= 19; // Generic check for other types
    }
  }
}
