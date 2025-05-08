const Comment = require("../models/commentSchema");

const getAllComments = async (req, res) => {
  try {
    const { activityId } = req.query; 
    const query = activityId ? { activity: activityId } : {}; 

    const comments = await Comment.find(query).populate("userId", "username image");

    if (comments.length === 0) {
      return res.status(404).json({
        message: "Comments not found",
      });
    }

    return res.status(200).json({
      data: comments,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      data: comment,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      data: deletedComment,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      message: "Comment Updated",
      data: updatedComment,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
};

const addComment = async (req, res) => {
  try {
    const addedComment = await Comment.create({ ...req.body });

    return res.status(201).json({
      data: addedComment,
      message: "Successfully added",
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment,
  addComment,
};
