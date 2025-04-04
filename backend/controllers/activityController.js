const Activity = require("../models/activitySchema");

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({});

    if (activities.length === 0) {
      res.status(404).json({
        message: "Activities not found",
      });
    }

    res.status(200).json({
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.findById(id);

    if (!activity) {
      res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json({
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedActivity = await Activity.findByIdAndDelete(id);

    if (!deletedActivity) {
      res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json({
      data: deletedActivity,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const uptadeActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: req.file && `http://localhost:8000/${req.file.path}`,
      },
      { new: true }
    );

    if (!updatedActivity) {
      res.status(404).json({
        message: "Activity not found",
      });
    }

    res.status(200).json({
      message: "Activity Updated",
      data: updatedActivity,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const addActivity = async (req, res) => {
  const imageUrl = `http://localhost:8000/${req.file.path}`;
  try {
    const addedActivity = await Activity.create({
      ...req.body,
      image: imageUrl,
    });
    await Activity.save();
    res.status(201).json({
      data: addedActivity,
      message: "Successfully added",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  deleteActivity,
  uptadeActivity,
  addActivity,
};
