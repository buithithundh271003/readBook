import readLater from "../models/readLater";
export const create = async (req, res) => {
    try {
        const readlater = await readLater.findOne({ productId: req.body.productId })
        if (readlater) {
            console.log("if");

            
            const newCart = await readLater.findOneAndUpdate(
                { productId: req.body.productId },
                { new: true }
            );
            if (!newCart) {
                return res.status(404).json({
                    message: "readLater not found",
                });
            }
            return res.status(200).json({
                message: "readLater created successfully",
                data: newCart,
            });
        } else {
            const readlater = await readLater.create(req.body);
            if (!readlater) {
                return res.status(404).json({
                    message: "readLater not found",
                });
            }
            return res.status(200).json({
                message: "readLater created successfully",
                data: readLater,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error,
        });
    }
};
export const getAll = async (req, res) => {
    try {
        console.log("abc");
        const AllreadLater = await readLater.find({});
        if (AllreadLater.length === 0) {
            return res.status(404).json({
                message: "There are no category in the list."
            })
        }
        return res.status(200).json({
            message: "Get category list successfully!",
            AllreadLater,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const read = await readLater.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({
            message: "readLater delete successfully",
            data: read,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};