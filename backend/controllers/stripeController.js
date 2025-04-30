const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const getPayments = async (req, res) => {
  try {
    const charges = await stripe.charges.list({
      limit: 10,
    });
    res.json(charges);
  } catch (error) {
    res.status(500).json({
        error: error.message,
      });
  }
};

const getBalance = async (req,res) => {
  try {
    const balance = await stripe.balance.retrieve();
    res.json(balance);
  } catch (error) {
    res.status(500).json({
        error: error.message,
      });
  }
};

const getCustomers = async (req,res) => {
  try {
    const customers = await stripe.customers.list({
      limit: 10,
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({
        error: error.message,
      });
  }
};

const getCheckoutSessions = async (req,res) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({
        error: error.message,
      });   
  }
};

const stripePayment = async (req, res) => {
  try {
    const { basketItems } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: basketItems.map((item) => ({
        price_data: {
          currency: "azn",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).send("Error creating checkout session");
  }
};

module.exports = {
  stripePayment,
  getBalance,
  getPayments,
  getCustomers,
  getCheckoutSessions,
};
