import {Router} from 'express';
import ChatMessage  from '../models/chatMessage.js';
const chatRouter = Router();


chatRouter.get('/:eventId/chat',async (req, res) => {
    const messages= await ChatMessage.find({eventId:req.params.eventId}).populate('userId');
    res.json(messages);
}
);
chatRouter.post('/:eventId/chat',async (req, res) => {
    const {text,userId} = req.body;
    const message = await ChatMessage.create({text,eventId:req.params.eventId,userId});
    res.json(message);
}
);
export default chatRouter;