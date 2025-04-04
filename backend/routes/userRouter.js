const express=require("express")
const {getAllUsers,getUserById,deleteUser,uptadeUser}=require("../controllers/userControllers")
const upload=require("../middlewares/multerMiddleware")

const router=express.Router()

router.get("/",verify(["admin"]),getAllUsers)
router.get("/:id",verify(["admin"]),getUserById)
router.delete("/:id",verify(["admin"]),deleteUser)
router.put("/:id",verify(["admin,user"]),uptadeUser)
router.patch("/:id",verify(["admin,user"]),uptadeUser)

module.exports=router