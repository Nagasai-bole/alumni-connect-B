const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["workshop", "meetup", "webinar", "conference"],
      default: "meetup",
    },
    featuredAlumni: [{ type: String }], // array of names or IDs
    imagets: { type: String, default: "" }, // optional image URL
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
