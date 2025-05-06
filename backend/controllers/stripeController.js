const Stripe = require("stripe");
const dotenv = require("dotenv");
const Activity = require("../models/activitySchema");
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const getPayments = async (req, res) => {
  try {
    const charges = await stripe.charges.list({
      limit: 100
    });
    res.json(charges);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getBalance = async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();
    res.json(balance);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCustomers = async (req, res) => {
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

const getCheckoutSessions = async (req, res) => {
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

    const totalTickets = basketItems.reduce(
      (acc, item) => acc + (item.ticketCount || 1),
      0
    );

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
        quantity: item.ticketCount || 1,
      })),
      mode: "payment",
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
      payment_intent_data: {
        metadata: {
          total_tickets: totalTickets.toString(),
        },
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).send("Error creating checkout session");
  }
};



const confirmSeats = async (req, res) => {
  try {
    const { basketItems } = req.body; 

    for (const item of basketItems) {
      const activity = await Activity.findById(item.activityId);
      if (!activity) continue;

      for (let i = 0; i < activity.seats.length; i++) {
        for (let j = 0; j < activity.seats[i].length; j++) {
          const seat = activity.seats[i][j];

          if (
            seat.seatNumber === item.seat.seatNumber &&
            seat.zone === item.seat.zone
          ) {
            seat.isBooked = true;
          }
        }
      }

      await activity.save();
    }

    res.status(200).json({ message: "Seats successfully booked" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  stripePayment,
  getBalance,
  getPayments,
  getCustomers,
  getCheckoutSessions,
  confirmSeats
};
