const express = require("express");
const {getAllComments,getCommentById,deleteComment,uptadeComment,addComment} = require("../controllers/commentController");

const router = express.Router();

router.get("/",getAllComments)
router.get("/:id",getCommentById)
router.delete("/:id",deleteComment)
router.put("/:id",uptadeComment)
router.patch("/:id",uptadeComment)
router.post("/",addComment)

module.exports=router
