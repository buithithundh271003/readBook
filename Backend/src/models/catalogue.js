import mongoose,{Schema} from "mongoose";
import paginate from "mongoose-paginate-v2";
const CatalogueSchema= new Schema(
    {
        name:{type:String, trim: true, required:true},
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
        },
    },
    {timestamps:true, versionKey:false}

);
CatalogueSchema.index({
    name: "text",
});
CatalogueSchema.plugin(paginate);
export default mongoose.model("Catalogue",CatalogueSchema);
