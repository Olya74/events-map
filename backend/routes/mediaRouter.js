import express from 'express';
import  multer from 'multer';
import {uploadMedia,getMediaEvent,deleteMedia} from '../controller/mediaControllers.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'),uploadMedia);
router.get("/",getMediaEvent);
router.delete('/:id', deleteMedia);

export default router;
