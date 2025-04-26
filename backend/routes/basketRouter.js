const express = require("express");
const toogleBasket=require("../controllers/basketController")
const verify=require("../middlewares/authMiddleware")

const router=express.Router()

router.post("/",verify(["admin","user"]),toogleBasket)

module.exports=router