const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // new password field
  profilePic: String,
  batch: String,
  department: String,
  currentClass: String,
  phone: String,
  location: String,
  skills: [String],
  extracurriculars: [String],
  achievements: [String],
  isAvailableForMentorship: Boolean,
});

module.exports = mongoose.model("Student", studentSchema);
