const express=require("express")
const {getAllUsers,getUserById,deleteUser,updateUser, updatePassword, getUserPromoCodes}=require("../controllers/userControllers")
const upload=require("../middlewares/multerMiddleware")
const verify = require("../middlewares/authMiddleware")

const router=express.Router()

router.get("/",verify(["admin","user"]),getAllUsers)
router.get("/:id",verify([ "admin" , "user" ]),getUserById)
router.get("/:userId/promocodes",verify([ "admin" , "user" ]), getUserPromoCodes);
router.delete("/:id",verify([ "admin" , "user" ]),deleteUser)
router.put("/:id",upload.single("image"),verify([ "admin" , "user" ]),updateUser)
router.patch("/:id",upload.single("image"),verify([ "admin", "user" ]),updateUser)
router.patch("/update-password/:id" , verify([ "admin", "user" ]),updatePassword)

module.exports=router