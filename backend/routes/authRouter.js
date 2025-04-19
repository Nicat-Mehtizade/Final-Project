const express=require("express")
const {login,register,logout, setPassword}=require("../controllers/authController")
const verify=require("../middlewares/authMiddleware")
const router=express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout);
router.patch("/users/:id/set-password", verify(["admin","user"]),setPassword)



module.exports=router