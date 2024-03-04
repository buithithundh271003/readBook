import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        author: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        content: { type: String, trim: true, required: true },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        images: [
            {
                type: Object,
                required: true,
            },
        ],
    },
    { timestamps: true, versionKey: false }
);
productSchema.index({
    name: "text",
    author: "text",
});
productSchema.plugin(paginate);
export default mongoose.model("Product", productSchema);