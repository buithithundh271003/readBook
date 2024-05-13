import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Ichapter from "../../interface/chapter";

interface initialState {
    chapters: Ichapter[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
    chapters: [],
    loading: false,
    error: "",
};
export const getAllChapter = createAsyncThunk(
    "chapters/getChapters",
    async (query?: string) => {
        console.log("Thu bui",query);
        const {
            data: { chapters }
        } = await axios.get<{ chapters: Ichapter[] }>(
            `http://localhost:3000/api/chapters${query ?? ""}`
        );
        return chapters;
    }
);
export const createChapter = createAsyncThunk(
    "chapters/addChapters",
    async (chapter: Ichapter) => {
        console.log("chapter",chapter);
        const { data } = await axios.post<{ chapter: Ichapter }>(
            "http://localhost:3000/api/chapters",
            chapter
        );

        return data;
    }
);
export const removeChapter = createAsyncThunk(
    "products/removeProducts",
    async (id: string) => {
        console.log("remove",id)
        await axios.delete(`http://localhost:3000/api/chapters/${id}`);

        return id;
    }
);
const chapterSlice = createSlice({
    name: "chapter",
    initialState,
    reducers: {
        getChapterByProduct: (state, action) => {
            state.chapters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllChapter.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllChapter.fulfilled, (state, action) => {
                state.chapters = action.payload.data;
                state.loading = false;
            })
            .addCase(getAllChapter.rejected, (state) => {
                state.loading = false;
            })
            // // Add Product
            .addCase(createChapter.pending, (state) => {
                state.loading = true;
            })
            .addCase(createChapter.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createChapter.rejected, (state) => {
                state.loading = false;
            })
            // Update Product
            // .addCase(updateProduct.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(updateProduct.fulfilled, (state, action) => {
            //     state.products = state.products?.map((product: IProduct) =>
            //         product._id === action?.payload?.product?._id
            //             ? action.payload.product
            //             : product
            //     );
            //     state.loading = false;
            // })
            // .addCase(updateProduct.rejected, (state) => {
            //     state.loading = false;
            // })
            // Delete Product
            .addCase(removeChapter.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeChapter.fulfilled, (state, action) => {
                state.chapters = state.chapters?.filter(
                    (chapter: Ichapter) => chapter._id !== action.payload
                );

                state.loading = false;
            })
            .addCase(removeChapter.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { getChapterByProduct } = chapterSlice.actions;
export default chapterSlice.reducer;