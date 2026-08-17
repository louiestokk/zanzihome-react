import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(
  "pk_live_51LqkjqDSQMjhOKpO83EKjl07NoapF7NOjOIA4bpcvh5ljKbS8WghEfjuHbBVMco1SJyTqkddw7mijgIJps2hSF1h00lSDDVrDp"
);

export async function POST(request) {
  try {
    const bodyText = await request.text();
    const amount = JSON.parse(bodyText);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: "usd",
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
