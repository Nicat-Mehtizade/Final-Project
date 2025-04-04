const express=require("express")
const {getAllUsers,getUserById,deleteUser,uptadeUser}=require("../controllers/userControllers")
const upload=require("../middlewares/multerMiddleware")

const router=express.Router()

router.get("/",getAllUsers)
router.get("/:id",getUserById)
router.delete("/:id",deleteUser)
router.put("/:id",uptadeUser)
router.patch("/:id",uptadeUser)

module.exports=router