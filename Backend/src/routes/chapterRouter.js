import express from 'express';
import { addChapter,getChapters,deleteChapter} from '../controllers/chapter';
import { File } from "../middlewares/file";
const router = express.Router();

router
    .post('/',File.single("content"), addChapter)
    .get('/', getChapters)
    // .get('/:id', getProduct)
    // .patch('/:id', updateProduct)
    .delete('/:id', deleteChapter)

export default router;