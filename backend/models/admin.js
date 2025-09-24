const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // new password field
  batch: { type: String, required: true },
  department: String,
  phone: String,
});

module.exports = mongoose.model("Admin", AdminSchema);
