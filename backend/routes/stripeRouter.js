const express = require("express");
const {stripePayment,getBalance,getCheckoutSessions,getCustomers,getPayments,confirmSeats}=require("../controllers/stripeController")


const router = express.Router();

router.post('/create-checkout-session', stripePayment);
router.post("/confirm-seats",confirmSeats)
router.get("/balance", getBalance)
router.get("/sessions", getCheckoutSessions)
router.get("/customers", getCustomers)
router.get("/payments",getPayments)

module.exports = router;
