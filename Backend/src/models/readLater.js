import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const readLaterSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
      
     
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false }
);
readLaterSchema.plugin(mongoosePaginate);

export default mongoose.model("readLater", readLaterSchema);