const express=require("express")
const {login,register,logout, setPassword,forgotPassword,resetPassword}=require("../controllers/authController")
const verify=require("../middlewares/authMiddleware")
const router=express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.patch("/users/:id/set-password", verify(["admin","user"]),setPassword)



module.exports=router