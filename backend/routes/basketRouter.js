const express = require("express");
const {toggleBasket,clearBasket}=require("../controllers/basketController")
const verify=require("../middlewares/authMiddleware")

const router=express.Router()

router.post("/",verify(["admin","user"]),toggleBasket)
router.patch("/clear",verify(["admin","user"]),clearBasket)

module.exports=router