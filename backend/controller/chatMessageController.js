import ChatMessage from "../models/ChatMessage.js";


const getMessages = async (req, res) => {
    const { eventId } = req.params;
    console.log(eventId);
    const messages = await ChatMessage.findOne({ eventId: eventId }).populate('userId');
    res.json(messages);
}
const addMessage = async (req, res) => {
    const { text, userId } = req.body;
    const message = await ChatMessage.create({ text, eventId: req.params.eventId, userId });
    res.json(message);
}
const getMessagesByEventId = async (req, res) => {
    const messages = await ChatMessage.find({ eventId: req.params.eventId }).populate('userId');
    res.json(messages);
}
const getMessageById = async (req, res) => {
    const message = await ChatMessage.findById(req.params.id).populate('userId');
    res.json(message);
}

export {
    getMessages,
    addMessage,
    getMessagesByEventId,
    getMessageById
}