import {Router} from 'express';
import {
    getEvents,
    getEventById,
    addEvent,
    updateEventById,
    updateEventPartById,
    deleteEvents
} from '../controller/eventController.js';
const router = Router();



router.route('/events').get(getEvents).post(addEvent).delete(deleteEvents);
router.route('/events/:id').get(getEventById).put(updateEventById).patch(updateEventPartById);

export default router;
