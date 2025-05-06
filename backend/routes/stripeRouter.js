const express = require("express");
const {stripePayment,getBalance,getCheckoutSessions,getCustomers,getPayments,confirmSeats}=require("../controllers/stripeController")
const verify=require("../middlewares/authMiddleware")

const router = express.Router();

router.post('/create-checkout-session',verify(["admin","user"]), stripePayment);
router.post("/confirm-seats",verify(["admin","user"]),confirmSeats)
router.get("/balance",verify(["admin"]),  getBalance)
router.get("/sessions",verify(["admin"]),  getCheckoutSessions)
router.get("/customers",verify(["admin"]),  getCustomers)
router.get("/payments",verify(["admin"]), getPayments)

module.exports = router;
