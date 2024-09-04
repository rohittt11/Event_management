const express = require("express");
const { body } = require("express-validator");
const eventController = require("../controllers/eventController");
const validate = require("../middlewares/validate");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

// Render create event form
router.get("/create", (req, res) => {
  res.render("create_event");
});

// Create a new event
router.post(
  "/",
  upload.single("banner"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("location").notEmpty().withMessage("Location is required"),
  ],
  validate,
  eventController.createEvent
);

// Get all events
router.get("/", eventController.getAllEvents);

// Get event by ID
router.get("/:id", eventController.getEventById);

// Render update event form
router.get("/:id/edit", async (req, res) => {
  try {
    const Event = require("../models/eventModel");
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }
    res.render("update_event", { event, query: req.query });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Render registration form
router.get("/:id/register", async (req, res) => {
  try {
    const Event = require("../models/eventModel");
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.render("register_event", { event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update event by ID
router.put(
  "/:id",
  upload.single("banner"), // Add multer middleware here
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description is required"),
    body("date").optional().isISO8601().withMessage("Valid date is required"),
    body("location").optional().notEmpty().withMessage("Location is required"),
  ],
  validate,
  eventController.updateEventById
);

// Delete event by ID
router.delete("/:id", eventController.deleteEventById);

// Register for an event
router.post(
  "/:id/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  validate,
  eventController.registerForEvent
);

module.exports = router;
