const express=require("express")
const {getAllUsers,getUserById,deleteUser,updateUser}=require("../controllers/userControllers")
const upload=require("../middlewares/multerMiddleware")
const verify = require("../middlewares/authMiddleware")

const router=express.Router()

router.get("/",verify(["admin"]),getAllUsers)
router.get("/:id",verify(["admin"]),getUserById)
router.delete("/:id",verify(["admin"]),deleteUser)
router.put("/:id",verify(["admin,user"]),updateUser)
router.patch("/:id",verify(["admin,user"]),updateUser)

module.exports=router