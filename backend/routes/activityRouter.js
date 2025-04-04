const express=require("express")
const {getAllActivities,getActivityById,deleteActivity,addActivity,uptadeActivity}=require("../controllers/activityController")

const router=express.Router()

router.get("/",getAllActivities)
router.get("/:id",getActivityById)
router.deleteActivity("/:id",deleteActivity)
router.post("/",addActivity)
router.put("/:id",uptadeActivity)
router.patch("/:id",uptadeActivity)

module.exports=router