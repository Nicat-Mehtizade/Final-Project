const Comment = require("../models/commentSchema");

const getAllComments = async (req, res) => {
  try {

    const { activityId } = req.query; 

    const query = activityId ? { activity: activityId } : {}; 

    const comments = await Comment.find(query).populate("userId", "username image");

    if (comments.length === 0) {
      res.status(404).json({
        message: "Comments not found",
      });
    }

    res.status(200).json({
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json({
      data: comment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedcomment = await Comment.findByIdAndDelete(id);

    if (!deletedcomment) {
      res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json({
      data: deletedcomment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const uptadeComment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedcomment = await Comment.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedcomment) {
      res.status(404).json({
        message: "Comment not found",
      });
    }

    res.status(200).json({
      message: "Comment Updated",
      data: updatedcomment,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const addComment = async (req, res) => {
  try {
    const addedComment = await Comment.create({ ...req.body });

    res.status(201).json({
      data: addedComment,
      message: "Successfully added",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  deleteComment,
  uptadeComment,
  addComment
};
