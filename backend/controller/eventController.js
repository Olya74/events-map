import Event from "../models/Event.js";
import cloudinary from "../config/cloudinary.js";

//const token=req.headers["Authorization"];
// Пример запроса: /events?category=экология&date=2025-04-10
const getEvents = async (req, res) => {
  try {
    // console.log(req.user);
    const { category, date } = req.query;
    const query = {};
    if (category) query.category = category;
    if (date) query.date = date;
    const events = query ? await Event.find(query) : await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addEvent = async (req, res) => {
  try {
    const { title, description, category, date, lat, lng, userId } = req.body;
    const files = req.files.map((file) => {
      return {
        public_id: file.filename,
        url: `/uploads/${req.file.originalname}`,
        type: file.mimetype.startsWith("video") ? "video" : "image",
      };
    });

    // url: file.path,
    
    // const files = await req.files.map((file) => {
    // //   const result = cloudinary.uploader.upload(file.path, {
    // //     resource_type: file.mimetype.startsWith("video")
    // //       ? "video"
    // //       : "image",
    // //   });
    //   return {
    //     public_id: file.public_id,
    //     url: file.secure_url,
    //     type: file.mimetype.startsWith("video") ? "video" : "image"
    //   };
    // });
    console.log("files", files);

    const newEvent = new Event({
      title,
      description,
      category,
      date: date,
      media: files,
      location: { lat: lat, lng: lng },
      userId,
    });
    console.log("newEvent", newEvent);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteEvents = async (req, res) => {
  try {
    const deletedEvent = await Event.deleteMany();
    res.status(200).json(deletedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateEventById = async (req, res) => {};
const updateEventPartById = async (req, res) => {};

export {
  getEvents,
  getEventById,
  addEvent,
  updateEventById,
  updateEventPartById,
  deleteEvents,
};
