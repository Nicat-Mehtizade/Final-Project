const express=require("express")
const {getAllActivities,getActivityById,deleteActivity,addActivity,uptadeActivity}=require("../controllers/activityController")
const upload=require("../middlewares/multerMiddleware")

const router=express.Router()

router.get("/",getAllActivities)
router.get("/:id",getActivityById)
router.deleteActivity("/:id",deleteActivity)
router.post("/",upload.single("image"),addActivity)
router.put("/:id",upload.single("image"),uptadeActivity)
router.patch("/:id",upload.single("image"),uptadeActivity)

module.exports=router