import express from 'express';
import { addChapter,getChapters,deleteChapter} from '../controllers/chapter';

const router = express.Router();

router
    .post('/', addChapter)
    .get('/', getChapters)
    // .get('/:id', getProduct)
    // .patch('/:id', updateProduct)
    .delete('/:id', deleteChapter)

export default router;