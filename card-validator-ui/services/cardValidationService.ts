export type ValidationResult = {
  valid: boolean;
  cardType: string;
  error: string | null;
};

const apiEndpoint = process.env.NEXT_PUBLIC_NEXTJS_ENDPOINT;

/**
 * Validates a credit card number by sending it to the backend API
 * @param cardNumber The credit card number to validate
 * @returns Promise with validation result
 */
export const validateCreditCard = async (
  cardNumber: string
): Promise<ValidationResult> => {
  try {
    const response = await fetch(apiEndpoint + "/credit-card/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cardNumber }),
    });

    if (!response.ok) {
      throw new Error("Validation request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Error validating card:", error);
    return {
      valid: false,
      cardType: "Unknown",
      error: "Service unavailable",
    };
  }
};
