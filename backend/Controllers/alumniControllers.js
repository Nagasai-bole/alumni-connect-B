const Alumni = require("../models/alumni");

// Get all alumni
const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find().lean();
    res.json({ alumni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get filtered alumni
const getFilteredAlumni = async (req, res) => {
  try {
    const { search, batch, department, company, skills } = req.query;

    const filter = {};

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { name: regex },
        { currentCompany: regex },
        { role: regex },
      ];
    }

    if (batch && batch !== "all") filter.batch = batch;
    if (department && department !== "all") filter.department = department;
    if (company && company !== "all") filter.currentCompany = company;
    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : skills.split(",");
      filter.skills = { $in: skillsArray };
    }

    const alumni = await Alumni.find(filter).lean();
    res.json({ alumni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllAlumni,
  getFilteredAlumni,
};
