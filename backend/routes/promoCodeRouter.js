const express=require("express")
const {checkPromoCode,createPromoCode,getAllPromoCodes,deletePromoCode,updatePromoCode}=require("../controllers/promoController")
const upload=require("../middlewares/multerMiddleware")
const verify=require("../middlewares/authMiddleware")
const router=express.Router()

router.get("/",verify(["admin"]),getAllPromoCodes)
router.post("/",verify(["admin","user"]),upload.none(),createPromoCode)
router.post("/validate", checkPromoCode);
router.delete("/:id",verify(["admin"]),deletePromoCode)
router.patch("/:id",verify(["admin"]),updatePromoCode)

module.exports=router