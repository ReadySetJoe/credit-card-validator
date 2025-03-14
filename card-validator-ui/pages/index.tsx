import React from "react";
import { CreditCardForm } from "../components/CreditCardForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 mt-4">
      <h1 className="text-3xl font-bold mb-4">Credit Card Validation App</h1>
      <p className="mb-8 text-gray-600">
        Enter a credit card number below to validate it using the Luhn
        algorithm.
      </p>

      <CreditCardForm />

      <div className="mt-12 text-sm text-gray-500">
        <p>
          Note: This app is for demonstration purposes only. No card data is
          stored.
        </p>
      </div>
    </main>
  );
}
