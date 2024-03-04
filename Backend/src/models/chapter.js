import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const chapterSchema = new Schema(
    {
        name: { type: String, trim: true, required: true },
        title: { type: String, trim: true, required: true },
        content: { type: String, trim: true, required: true },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    },
    { timestamps: true, versionKey: false }
);
chapterSchema.index({
    name: "text",
    author: "text",
});
    chapterSchema.plugin(paginate);
export default mongoose.model("Chapter", chapterSchema);