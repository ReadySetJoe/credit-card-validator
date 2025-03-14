import React, { useState } from "react";
import {
  validateCreditCard,
  ValidationResult,
} from "../services/cardValidationService";

export const CreditCardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    const groups = [];

    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }

    return groups.join(" ");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (/^[\d\s]*$/.test(input)) {
      setCardNumber(formatCardNumber(input));
    }
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cardDigits = cardNumber.replace(/\s/g, "");
    if (!cardDigits) {
      setError("Please enter a card number");
      setResult(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const validationResult = await validateCreditCard(cardDigits);
      setResult(validationResult);
    } catch (err) {
      console.error(err);
      setError("Failed to validate card. Please try again.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleInputChange}
            placeholder="Enter card number"
            className="w-full"
            maxLength={23} // 16 digits + 3 spaces
          />
        </div>

        <button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Validating..." : "Validate Card"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result && (
        <div
          className={`mt-4 p-4 rounded-md ${
            result.valid
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <div className="font-bold mb-2">
            {result.valid ? "Valid Card ✓" : "Invalid Card ✗"}
          </div>
          <div>Card Type: {result.cardType}</div>
          {result.error && <div className="mt-1">Error: {result.error}</div>}
        </div>
      )}
    </div>
  );
};
