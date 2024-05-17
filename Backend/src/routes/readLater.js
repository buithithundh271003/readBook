import express from 'express';
import { create, getAll, remove} from '../controllers/readLater';

const router = express.Router();

router
    .post('/', create)
    .get('/', getAll)
    .delete('/:id', remove)

export default router;
