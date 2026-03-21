import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    message: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1000,
    },

    // ⭐ NEW FEATURES

    isRead: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },

    // Optional: for replying later
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// 🔍 Indexes for performance (important)
contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;