const Seat = require("../models/seatSchema");
const Activity = require("../models/activitySchema");

const getSeatsWithPrice = async (req, res) => {
  try {
    const { id: activityId } = req.params;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    const seats = await Seat.find({ activityId });

    const zones = ["A", "B", "C", "D"];
    const seatZones = zones.map((zone, index) => ({
      zone,
      price: activity.price[3 - index],
      seats: seats
        .filter((seat) => seat.zone === zone)
        .map(({ seatNumber, isBooked }) => ({ seatNumber, isBooked })),
    }));

    res.json({ seatZones });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const bookSeats = async (req, res) => {
  const { id: activityId } = req.params;
  const { seatNumbers, userId } = req.body;

  const updated = await Seat.updateMany(
    {
      activityId,
      seatNumber: { $in: seatNumbers },
      isBooked: false,
    },
    {
      $set: {
        isBooked: true,
        userId,
      },
    }
  );
  if (updated.modifiedCount !== seatNumbers.length) {
    return res.status(409).json({ message: "Some seats are already booked." });
  }
  res.json({ success: true });
};


const createSeats = async (activityId) => {
  const zones = ["A", "B", "C", "D"];
  const seats = [];

  zones.forEach((zone) => {
    for (let i = 1; i <= 10; i++) {
      seats.push({
        activityId,
        seatNumber: `${zone}${i}`,
        zone,
        isBooked: false,
      });
    }
  });

  await Seat.insertMany(seats);
  console.log("Seats created!");
};

module.exports = { getSeatsWithPrice, bookSeats, createSeats };
