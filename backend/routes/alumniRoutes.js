const express = require("express");
const router = express.Router();
const {
  getAllAlumni,
  getFilteredAlumni,
} = require("../Controllers/alumniControllers");

// Route to get all alumni
router.get("/", getFilteredAlumni); // You can use query params for filtering

module.exports = router;
