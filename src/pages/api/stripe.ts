import Stripe from "stripe";
import Cors from "micro-cors";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2022-08-01",
});

const cors = Cors();

// stripetestcart = 4242424242424242

const createCheckoutSession = cors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const price = parseInt(req.body.price) * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: req.body.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.APP_URL}/payment/success?game=${req.body.gameId}&user=${req.body.user}`,
      cancel_url: `${process.env.APP_URL}/game/${req.body.gameId}`,
    });

    res.status(200).send({ sessionId: session.id });
  }
);
export default createCheckoutSession;
