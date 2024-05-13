import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IReview from "../../interface/review";

interface initialState {
    reviews: IReview[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
    reviews: [],
    loading: false,
    error: "",
};
export const getAllReview = createAsyncThunk(
    "reviews/get",
    async () => {
    console.log("18rv");

        const { data } = await axios.get<{ reviews: IReview[] }>(
            "http://localhost:3000/api/review"
        );
        console.log(data);
    console.log("------------25rv-------------");

        return data.reviews;
    }
   
);
export const createReview = createAsyncThunk(
    "review/addReviews",
    async (review: IReview) => {
        const { data } = await axios.post<{ review: IReview }>(
            "http://localhost:3000/api/review",
            review
        );

        return data;
    }
);

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        getReviewByProduct: (state, action) => {
            state.reviews = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllReview.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllReview.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loading = false;
        })
        .addCase(getAllReview.rejected, (state) => {
            state.loading = false;
        })
            // // Add Product
            .addCase(createReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReview.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createReview.rejected, (state) => {
                state.loading = false;
            })
       
        
    },
});

export const { getReviewByProduct } = reviewSlice.actions;
export default reviewSlice.reducer;