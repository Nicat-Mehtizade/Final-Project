const express = require("express");
const {stripePayment,getBalance,getCheckoutSessions,getCustomers,getPayments}=require("../controllers/stripeController")


const router = express.Router();

router.post('/create-checkout-session', stripePayment);
router.get("/balance", getBalance)
router.get("/sessions", getCheckoutSessions)
router.get("/customers", getCustomers)
router.get("/payments",getPayments)

module.exports = router;
