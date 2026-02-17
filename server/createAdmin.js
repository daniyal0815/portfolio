import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();


const ADMIN_EMAIL = "daniyalraza0815@gmail.com";
const ADMIN_PASSWORD = "daniyal001";

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log("Admin already exists. Skipping creation.");
      process.exit();
    }

    await Admin.create({
      email: ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log("Admin Created Successfully");
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
