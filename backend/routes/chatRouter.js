import {Router} from 'express';
import {
     getMessages,
        addMessage,
        getMessagesByEventId,
        getMessageById
} from '../controller/chatMessageController.js';
const chatRouter = Router();


chatRouter.route('/events/:eventId/chat').get(getMessages);

chatRouter.route('/events/:eventId/chat').post(addMessage);
chatRouter.route('/events/:eventId/chat/:id').get(getMessageById);
chatRouter.route('/events/:eventId/chat').get(getMessagesByEventId);




export default chatRouter;