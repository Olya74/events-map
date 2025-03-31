import {Router} from 'express';
import {
    getEvents,
    getEventById,
    addEvent,
    updateEventById,
    updateEventPartById,
    deleteEventss
} from '../controller/eventController.js';
const router = Router();



router.route('/events').get(getEvents).post(addEvent).delete(deleteEventss);
router.route('/events/:id').get(getEventById).put(updateEventById).patch(updateEventPartById);

export default router;