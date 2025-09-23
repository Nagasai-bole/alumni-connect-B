const mongoose = require("mongoose");
const { Schema } = mongoose;

// Experience sub-schema
const ExperienceSchema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

// Achievement sub-schema
const AchievementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: String, required: true },
});

// Project sub-schema
const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: [String], default: [] },
  link: { type: String },
});

// Request sub-schema (for referrals & mentorship)
const RequestSchema = new Schema({
  message: { type: String, required: true },
  requestedBy: { type: Schema.Types.ObjectId, ref: "User" }, // optional, if you have a user model
  createdAt: { type: Date, default: Date.now },
});

// Alumni schema
const AlumniSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePic: { type: String },
  batch: { type: String, required: true },
  department: { type: String, required: true },
  currentCompany: { type: String },
  role: { type: String },
  location: { type: String },
  linkedIn: { type: String },
  skills: { type: [String], default: [] },
  experience: { type: [ExperienceSchema], default: [] },
  achievements: { type: [AchievementSchema], default: [] },
  projects: { type: [ProjectSchema], default: [] },
  isAvailableForMentorship: { type: Boolean, default: false },
  isAvailableForReferral: { type: Boolean, default: false },
  referralRequests: { type: [RequestSchema], default: [] },
  mentorshipRequests: { type: [RequestSchema], default: [] },
});

module.exports =
  mongoose.models.Alumni || mongoose.model("Alumni", AlumniSchema);
