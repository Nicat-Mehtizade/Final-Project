const express=require("express")
const {checkPromoCode,createPromoCode}=require("../controllers/promoController")
const upload=require("../middlewares/multerMiddleware")
const verify=require("../middlewares/authMiddleware")
const router=express.Router()

router.post("/",verify(["admin","user"]),upload.none(),createPromoCode)
router.post("/validate", checkPromoCode);

module.exports=router