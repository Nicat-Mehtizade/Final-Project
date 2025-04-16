const express = require("express");
const likeActivity=require("../controllers/likeController")
const verify=require("../middlewares/authMiddleware")

const router=express.Router()

router.post("/:id", verify(["user","admin"]), likeActivity)

module.exports=router