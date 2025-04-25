const express=require("express")
const {bookSeats,getSeatsWithPrice,createSeats}=require("../controllers/seatController")
const verify = require("../middlewares/authMiddleware");
const router=express.Router()


router.get("/:activityId/seats", getSeatsWithPrice);
router.post("/:activityId/book", verify(["user", "admin"]), bookSeats);
router.post("/:activityId/generate-seats", verify(["admin"]), createSeats);

module.exports=router