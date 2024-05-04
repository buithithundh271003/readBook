import { object } from "joi";
import Review from "../models/review";
import Product from "../models/product";
import { reviewSchema } from "../schemas/review"
export const addReview = async (req, res) => {
    try {
        console.log(req.body);
        const { error } = reviewSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        const review = await Review.create(req.body);
        if (!review) {
            return res.status(404).json({
                message: "Couldn't find a product to add."
            })
        }

        // Push product to category
        await Product.findByIdAndUpdate(review.productId, {
            $push: {
                reviews:review._id
            }
        });

        return res.status(200).json({
            message: "Add product successfully!",
            review
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        
        if (reviews.length === 0) {
            return res.status(404).json({
                message: "There are no category in the list."
            })
        }
        return res.status(200).json({
            message: "Get category list successfully!",
            reviews,
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
