const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Create new event (Admin only)
router.post("/", async (req, res) => {
  try {
    const { title, description, date, time, location, type, createdBy } =
      req.body;

    if (!title || !description || !date || !time || !location || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      type,
      createdBy, // optional
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
