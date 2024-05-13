import mongoose, { Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

const pdfSchema = new Schema(
    {
        title: { type: String, trim: true, required: true },
        fileName: { type: String, trim: true, required: true },
     
    },
    { timestamps: true, versionKey: false }
);

pdfSchema.plugin(paginate);
export default mongoose.model("File", pdfSchema);