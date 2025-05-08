const express = require("express");
const {
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
  addComment,
} = require("../controllers/commentController");
const verify = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.delete("/:id", verify(["admin", "user"]), deleteComment);
router.put("/:id", verify(["admin", "user"]), updateComment);
router.patch("/:id", verify(["admin", "user"]), updateComment);
router.post("/", verify(["admin", "user"]), addComment);

module.exports = router;
