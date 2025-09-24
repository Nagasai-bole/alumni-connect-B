require("dotenv").config();
const mongoose = require("mongoose");
const Student = require("./models/student"); // adjust path if needed

const studentData = [
  {
    name: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    password: "password123", // added
    role: "student", // added
    profilePic: "https://i.pravatar.cc/150?img=15",
    batch: "2026",
    department: "Computer Science",
    currentClass: "B.Tech 2nd Year",
    phone: "9876543210",
    location: "Hyderabad, India",
    skills: ["Java", "C++", "Problem Solving"],
    extracurriculars: ["Coding Club", "Robotics Society"],
    achievements: ["Hackathon Winner", "Dean’s Merit List"],
    isAvailableForMentorship: true,
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    password: "password123", // added
    role: "student", // added
    profilePic: "https://i.pravatar.cc/150?img=20",
    batch: "2025",
    department: "Electronics",
    currentClass: "B.Tech 3rd Year",
    phone: "9876501234",
    location: "Mumbai, India",
    skills: ["VLSI Design", "MATLAB", "Verilog"],
    extracurriculars: ["Electronics Club", "Drama Society"],
    achievements: ["Best Student Award 2023"],
    isAvailableForMentorship: false,
  },
  {
    name: "Ravi Kumar",
    email: "ravi.kumar@email.com",
    password: "password123", // added
    role: "student", // added
    profilePic: "https://i.pravatar.cc/150?img=25",
    batch: "2027",
    department: "Mechanical Engineering",
    currentClass: "B.Tech 1st Year",
    phone: "9876505678",
    location: "Delhi, India",
    skills: ["AutoCAD", "SolidWorks"],
    extracurriculars: ["Automobile Club"],
    achievements: ["National Science Olympiad Top 100"],
    isAvailableForMentorship: true,
  },
];

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(async () => {
    console.log("✅ Connected to DB");

    // Clear old students
    await Student.deleteMany({});
    console.log("🗑 Cleared existing students");

    // Insert new mock data
    await Student.insertMany(studentData);
    console.log("✅ Mock student data inserted");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
