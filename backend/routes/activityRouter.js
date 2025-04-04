const express=require("express")
const {getAllActivities,getActivityById,deleteActivity,addActivity,uptadeActivity}=require("../controllers/activityController")
const upload=require("../middlewares/multerMiddleware")
const verify=require("../middlewares/authMiddleware")
const router=express.Router()

router.get("/",getAllActivities)
router.get("/:id",getActivityById)
router.deleteActivity("/:id",verify(["admin"]),deleteActivity)
router.post("/",upload.single("image"),verify(["admin"]),addActivity)
router.put("/:id",upload.single("image"),verify(["admin"]),uptadeActivity)
router.patch("/:id",upload.single("image"),verify(["admin"]),uptadeActivity)

module.exports=router