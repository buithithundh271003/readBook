import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const reviewSchema = new Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        title: { type: String, trim: true, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true, versionKey: false }
);
reviewSchema.plugin(paginate);
export default mongoose.model("Review", reviewSchema);