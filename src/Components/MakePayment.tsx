import axios from "axios";

export const makePayment = async (
  cardNumber,
  expiryMonth,
  expiryYear,
  cvv,
  amount
) => {
  try {
    const response = await axios.post(
      "https://api.flutterwave.com/mock-api/v3/payments",
      {
        card_number: cardNumber,
        expiry_month: expiryMonth,
        expiry_year: expiryYear,
        cvv,
        amount,
        currency: "NGN", // Change to your desired currency code
        email: "johndoe@example.com", // Change to customer email address
        tx_ref: "test-transaction-12345", // Change to your unique transaction reference
        redirect_url: "https://your-redirect-url.com", // Change to your desired redirect URL
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer {{YOUR_FLUTTERWAVE_SECRET_KEY}}", // Replace with your Flutterwave secret key
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
