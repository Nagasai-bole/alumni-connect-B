const Alumni = require("../models/alumni");
const Student = require("../models/student");
const Admin = require("../models/admin");
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

// Login
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, and role are required" });
  }

  try {
    let user = null;

    if (role === "student") user = await Student.findOne({ email, password });
    else if (role === "alumni")
      user = await Alumni.findOne({ email, password });
    else if (role === "admin") user = await Admin.findOne({ email, password });
    else return res.status(400).json({ message: "Invalid role" });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    return res.status(200).json({
      message: "Login successful",
      role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
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
  loginUser,
};
