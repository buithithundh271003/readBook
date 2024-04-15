import { object } from "joi";
import Chapter from "../models/chapter";
import Product from "../models/product";
import { chapterSchema } from "../schemas/chapter"
export const addChapter = async (req, res) => {
    try {
        console.log(req.body);
        const { error } = chapterSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        const chapter = await Chapter.create(req.body);
        if (!chapter) {
            return res.status(404).json({
                message: "Couldn't find a product to add."
            })
        }

        // Push product to category
        await Product.findByIdAndUpdate(chapter.productId, {
            $push: {
                chapters: chapter._id
            }
        });

        return res.status(200).json({
            message: "Add product successfully!",
            chapter
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};
export const getChapters= async(req,res)=>{
    try{
        const {
            _page = 1,
            _limit = 100,
            _searchText,

        } = req.query;
        let query = {};
        if (_searchText) {
            query.$text = {
                $search: _searchText,
                $caseSensitive: false,
                $diacriticSensitive: false,
            }
        }
        if (Object.keys(query).length && _searchText ) {
            query = {
                $and: [
                    {
                        $text: {
                            $search: _searchText,
                            $caseSensitive: false,
                            $diacriticSensitive: false,
                        },
                    },
                   
                ]
            }
        }
        const myCustomLabels = {
            docs: "data",
        };

        const options = {
            page: _page,
            limit: _limit,
            customLabels: myCustomLabels
        };

        const chapters = await Chapter.paginate(query, {
            ...options,
            populate: [{ path: "productId", select: "name" }]
        });

        if (chapters.length === 0) {
            return res.status(404).json({
                message: "There are no chapter in the list.",
            });
        }

        return res.status(200).json({
            message: "Get product list successfully!",
            chapters,
        });


    }
    catch(error){
        return res.status(500).json({
            error: error.message
        });

    }
}
export const deleteChapter = async (req, res) => {
    const { id } = req.params;
    try {
        const chapter = await Chapter.findById(id);
        if (!chapter) {
            return res.status(404).json({
                message: "chapter not found!",
            });
        }
        console.log("mm");

        // Tìm danh mục của sản phẩm cần xóa
        // Xóa id sản phẩm khỏi danh mục đó
        const products = await Product.findByIdAndUpdate(chapter.productId);
        // console.log("pr",products);
        // products.productId.pull(id);
        await products.save();

        // xóa sản phẩm
        await Chapter.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Delete product successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};