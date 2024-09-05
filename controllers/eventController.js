const Event = require("../models/eventModel");
const Registration = require("../models/registration");
const nodemailer = require("nodemailer");
const path = require("path");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    const event = new Event({ name, description, date, location });
    if (req.file) {
      event.banner = path
        .join("uploads", req.file.filename)
        .replace(/\\/g, "/");
    }
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all events with pagination
exports.getAllEvents = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const events = await Event.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Event.countDocuments();

    res.render("events", {
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.render("event", { event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an event by ID
// exports.updateEventById = async (req, res) => {
//   try {
//     const { name, description, date, location } = req.body;
//     const event = await Event.findByIdAndUpdate(
//       req.params.id,
//       { name, description, date, location },
//       { new: true }
//     );
//     if (!event) {
//       return res.status(404).json({ message: "Event not found" });
//     }
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
exports.updateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, description, date, location } = req.body;

    // Find the event by ID
    let event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    // Update fields if they are provided
    if (name) event.name = name;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;

    // If a new banner image is uploaded, update the banner path
    if (req.file) {
      event.banner = `uploads/${req.file.filename}`;
    }

    // Save the updated event
    await event.save();
    res.redirect(`/events/${eventId}?success=updated`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete an event by ID
exports.deleteEventById = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register a user for an event
exports.registerForEvent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const registration = new Registration({
      eventId: req.params.id,
      name,
      email,
    });
    await registration.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Event Registration Confirmation",
      text: `Thank you for registering for ${event.name}! We look forward to seeing you there.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res
          .status(500)
          .json({ message: "Failed to send confirmation email" });
      }
      res.status(201).json({
        message: "Registration successful, confirmation email sent",
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
