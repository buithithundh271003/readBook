import express from 'express';
import { addReview,getReviews} from '../controllers/review';

const router = express.Router();

router
    .post('/', addReview)
    .get('/', getReviews)

export default router;