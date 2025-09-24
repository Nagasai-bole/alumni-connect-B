require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/admin");

const adminData = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "Alice@1234",
    batch: "2020-2024",
    department: "Computer Science",
    phone: "9876543210",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    password: "Bob@5678",
    batch: "2019-2023",
    department: "Electronics",
    phone: "9123456780",
  },
];

const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(async () => {
    console.log("✅ Connected to DB");

    // Insert mock alumni
    await Admin.insertMany(adminData);
    console.log("✅ Mock alumni data inserted");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ DB Connection Error:", err);
  });
