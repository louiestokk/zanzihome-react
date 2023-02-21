// domain/.netlify/functions/create-payment-intent
// const items = [
//   { id: 1, name: "Peter" },
//   { id: 2, name: "Susan" },
//   { id: 3, name: "Bertil" },
// ];
require("dotenv").config();

const stripe = require("stripe")(
  "pk_live_51LqkjqDSQMjhOKpO83EKjl07NoapF7NOjOIA4bpcvh5ljKbS8WghEfjuHbBVMco1SJyTqkddw7mijgIJps2hSF1h00lSDDVrDp"
);
exports.handler = async function (event, context) {
  if (event.body) {
    const amount = JSON.parse(event.body);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount),
        currency: "usd"
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message })
      };
    }
  }
  return {
    statusCode: 200,
    body: "Create Payment Intent"
  };
};
