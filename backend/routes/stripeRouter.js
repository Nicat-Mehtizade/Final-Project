const express = require("express");
const Stripe = require("stripe")
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

router.post('/create-checkout-session', async (req, res) => {
    try {
      const { basketItems } = req.body;
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: basketItems.map((item) => ({
          price_data: {
            currency: 'azn',  
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, 
          },
          quantity: 1,
        })),
        mode: 'payment',
        success_url: `http://localhost:5173/success`,
        cancel_url: `http://localhost:5173/cancel`,
      });
  
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error('Stripe Error:', error);
      res.status(500).send('Error creating checkout session');
    }
  });

module.exports = router;
