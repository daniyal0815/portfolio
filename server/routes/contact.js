import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();


// ✅ POST - Save Message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


// ✅ GET - All Messages (Admin with filters + pagination)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      status,
      isRead,
    } = req.query;

    const query = {};

    // 🔍 Search by name/email/message
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    // 📌 Filter by status
    if (status) {
      query.status = status;
    }

    // 📌 Filter by read/unread
    if (isRead !== undefined) {
      query.isRead = isRead === "true";
    }

    const total = await Contact.countDocuments(query);

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});


// ✅ PUT - Mark as Read
router.put("/:id/read", authMiddleware, async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.json({ success: true, data: updated });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});


// ✅ PUT - Update Status / Priority / Notes
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status, priority, notes } = req.body;

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, priority, notes },
      { new: true }
    );

    res.json({ success: true, data: updated });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});


// ✅ DELETE message
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedMessage = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// ✅ GET - Dashboard Stats (🔥 VERY IMPORTANT)
router.get("/stats/overview", authMiddleware, async (req, res) => {
  try {
    const total = await Contact.countDocuments();

    const unread = await Contact.countDocuments({ isRead: false });

    const today = await Contact.countDocuments({
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
      },
    });

    const week = await Contact.countDocuments({
      createdAt: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      success: true,
      data: {
        total,
        unread,
        today,
        week,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
});


export default router;