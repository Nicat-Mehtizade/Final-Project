const express = require("express");
const {
  getAllComments,
  getCommentById,
  deleteComment,
  uptadeComment,
  addComment,
} = require("../controllers/commentController");
const verify = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllComments);
router.get("/:id", getCommentById);
router.delete("/:id", verify(["admin", "user"]), deleteComment);
router.put("/:id", verify(["admin", "user"]), uptadeComment);
router.patch("/:id", verify(["admin", "user"]), uptadeComment);
router.post("/", verify(["admin", "user"]), addComment);

module.exports = router;
