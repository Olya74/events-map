import Event from "../models/Event.js";



//const token=req.headers["Authorization"];
  const getEvents = async (req, res) => {
    try {
        console.log(req.user);
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const addEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        console.log(req.user);
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const deleteEvents = async (req, res) => {
    try {
        const deletedEvent = await Event.deleteMany();
        res.status(200).json(deletedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
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
}
const updateEventById = async (req, res) => {
}
const updateEventPartById = async (req, res) => {
}

export {
    getEvents,
    getEventById,
    addEvent,
    updateEventById,
    updateEventPartById,
    deleteEvents
}