import express from 'express';
import  multer from 'multer';
import {
    getEvents,
    getEventById,
    addEvent,
    updateEventById,
    updateEventPartById,
    deleteEvents
} from '../controller/eventController.js';
import { authMe } from '../controller/userController.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });


router.route('/').get(getEvents).post(upload.array('files',5),addEvent).delete(deleteEvents);
router.route('/:id').get(getEventById).put(updateEventById).patch(updateEventPartById);

export default router;
