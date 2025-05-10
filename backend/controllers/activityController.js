const Activity = require("../models/activitySchema");

const getAllActivities = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const activities = await Activity.find({});

    if (activities.length === 0) {
      return res.status(404).json({
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
      return res.status(404).json({
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
      return res.status(404).json({
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
    if (req.body.price) {
      req.body.price = JSON.parse(req.body.price);
    }

    if (req.body["location[latitude]"] && req.body["location[longitude]"]) {
      req.body.location = {
        latitude: parseFloat(req.body["location[latitude]"]),
        longitude: parseFloat(req.body["location[longitude]"]),
      };
    }

    if (req.file) {
      req.body.image = `http://localhost:8000/${req.file.path}`;
    }

    const updatedActivity = await Activity.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
      seats: [
        [
          {
            row: 1,
            col: 1,
            type: "vip",
            seatNumber: "A1",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 2,
            type: "vip",
            seatNumber: "A2",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 3,
            type: "vip",
            seatNumber: "A3",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 4,
            type: "vip",
            seatNumber: "A4",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 5,
            type: "vip",
            seatNumber: "A5",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 6,
            type: "vip",
            seatNumber: "A6",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 7,
            type: "vip",
            seatNumber: "A7",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 8,
            type: "vip",
            seatNumber: "A8",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 9,
            type: "vip",
            seatNumber: "A9",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 10,
            type: "vip",
            seatNumber: "A10",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 11,
            type: "vip",
            seatNumber: "A11",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 12,
            type: "vip",
            seatNumber: "A12",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 13,
            type: "vip",
            seatNumber: "A13",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 14,
            type: "vip",
            seatNumber: "A14",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 15,
            type: "vip",
            seatNumber: "A15",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 16,
            type: "vip",
            seatNumber: "A16",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 17,
            type: "vip",
            seatNumber: "A17",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 18,
            type: "vip",
            seatNumber: "A18",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 19,
            type: "vip",
            seatNumber: "A19",
            zone: "A",
            isBooked: false,
          },
          {
            row: 1,
            col: 20,
            type: "vip",
            seatNumber: "A20",
            zone: "A",
            isBooked: false,
          },
        ],
        [
          {
            row: 2,
            col: 1,
            type: "gold",
            seatNumber: "B1",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 2,
            type: "gold",
            seatNumber: "B2",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 3,
            type: "gold",
            seatNumber: "B3",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 4,
            type: "gold",
            seatNumber: "B4",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 5,
            type: "gold",
            seatNumber: "B5",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 6,
            type: "gold",
            seatNumber: "B6",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 7,
            type: "gold",
            seatNumber: "B7",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 8,
            type: "gold",
            seatNumber: "B8",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 9,
            type: "gold",
            seatNumber: "B9",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 10,
            type: "gold",
            seatNumber: "B10",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 11,
            type: "gold",
            seatNumber: "B11",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 12,
            type: "gold",
            seatNumber: "B12",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 13,
            type: "gold",
            seatNumber: "B13",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 14,
            type: "gold",
            seatNumber: "B14",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 15,
            type: "gold",
            seatNumber: "B15",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 16,
            type: "gold",
            seatNumber: "B16",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 17,
            type: "gold",
            seatNumber: "B17",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 18,
            type: "gold",
            seatNumber: "B18",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 19,
            type: "gold",
            seatNumber: "B19",
            zone: "B",
            isBooked: false,
          },
          {
            row: 2,
            col: 20,
            type: "gold",
            seatNumber: "B20",
            zone: "B",
            isBooked: false,
          },
        ],
        [
          {
            row: 3,
            col: 1,
            type: "silver",
            seatNumber: "C1",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 2,
            type: "silver",
            seatNumber: "C2",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 3,
            type: "silver",
            seatNumber: "C3",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 4,
            type: "silver",
            seatNumber: "C4",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 5,
            type: "silver",
            seatNumber: "C5",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 6,
            type: "silver",
            seatNumber: "C6",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 7,
            type: "silver",
            seatNumber: "C7",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 8,
            type: "silver",
            seatNumber: "C8",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 9,
            type: "silver",
            seatNumber: "C9",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 10,
            type: "silver",
            seatNumber: "C10",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 11,
            type: "silver",
            seatNumber: "C11",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 12,
            type: "silver",
            seatNumber: "C12",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 13,
            type: "silver",
            seatNumber: "C13",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 14,
            type: "silver",
            seatNumber: "C14",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 15,
            type: "silver",
            seatNumber: "C15",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 16,
            type: "silver",
            seatNumber: "C16",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 17,
            type: "silver",
            seatNumber: "C17",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 18,
            type: "silver",
            seatNumber: "C18",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 19,
            type: "silver",
            seatNumber: "C19",
            zone: "C",
            isBooked: false,
          },
          {
            row: 3,
            col: 20,
            type: "silver",
            seatNumber: "C20",
            zone: "C",
            isBooked: false,
          },
        ],
        [
          {
            row: 4,
            col: 1,
            type: "standard",
            seatNumber: "D1",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 2,
            type: "standard",
            seatNumber: "D2",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 3,
            type: "standard",
            seatNumber: "D3",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 4,
            type: "standard",
            seatNumber: "D4",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 5,
            type: "standard",
            seatNumber: "D5",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 6,
            type: "standard",
            seatNumber: "D6",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 7,
            type: "standard",
            seatNumber: "D7",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 8,
            type: "standard",
            seatNumber: "D8",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 9,
            type: "standard",
            seatNumber: "D9",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 10,
            type: "standard",
            seatNumber: "D10",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 11,
            type: "standard",
            seatNumber: "D11",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 12,
            type: "standard",
            seatNumber: "D12",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 13,
            type: "standard",
            seatNumber: "D13",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 14,
            type: "standard",
            seatNumber: "D14",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 15,
            type: "standard",
            seatNumber: "D15",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 16,
            type: "standard",
            seatNumber: "D16",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 17,
            type: "standard",
            seatNumber: "D17",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 18,
            type: "standard",
            seatNumber: "D18",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 19,
            type: "standard",
            seatNumber: "D19",
            zone: "D",
            isBooked: false,
          },
          {
            row: 4,
            col: 20,
            type: "standard",
            seatNumber: "D20",
            zone: "D",
            isBooked: false,
          },
        ],
      ],
    });

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
