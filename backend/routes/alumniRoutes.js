const express = require("express");
const router = express.Router();
const {
  getAllAlumni,
  getFilteredAlumni,
  loginUser,
} = require("../Controllers/alumniControllers");

const Alumni = require("../models/alumni");

// Route to get all alumni
router.get("/", getFilteredAlumni); // You can use query params for filtering
router.post("/login", loginUser);
router.get("/:id", async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }
    res.json(alumni);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET requests for logged-in alumni
router.get("/me/requests", async (req, res) => {
  try {
    const alumniId = "68d2e67c29a918c9bc2929f1";
    const alumni = await Alumni.findById(alumniId);
    if (!alumni) return res.status(404).json({ message: "Alumni not found" });

    res.json({
      referralRequests: alumni.referralRequests || [],
      mentorshipRequests: alumni.mentorshipRequests || [],
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/referral", async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) return res.status(404).json({ message: "Alumni not found" });

    const { message } = req.body;
    alumni.referralRequests.push({ message });
    await alumni.save();

    res.json({ message: "Referral request sent" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST mentorship request
router.post("/:id/mentorship", async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id);
    if (!alumni) return res.status(404).json({ message: "Alumni not found" });

    const { message } = req.body;
    alumni.mentorshipRequests.push({ message });
    await alumni.save();

    res.json({ message: "Mentorship request sent" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
