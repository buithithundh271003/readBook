import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import IChuyenMuc from "../../interface/chuyenMuc";

interface initState {
    chuyenmuc: IChuyenMuc[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initState = {
    chuyenmuc: [],
    loading: false,
    error: "",
}
// export const getAllCategory = createAsyncThunk(
//     "category/getCategory",
//     async () => {
//         const { data } = await axios.get<{ categories: ICategory[] }>(
//             "http://localhost:8080/api/categories"
//         );
//         return data.categories;
//     }
// );

export const getAllChuyenMuc = createAsyncThunk(
    "chuyenmuc/getChuyenMuc",
    async () => {
        const { data } = await axios.get<{ chuyenmuc: IChuyenMuc[] }>(
            "http://localhost:8080/api/chuyenmuc"
        );
        console.log("dataaa",data);
      


        return data.chuyenmuc;
    }
);

export const createChuyenMuc = createAsyncThunk(
    "chuyenmuc/createChuyenMuc",
    async (chuyenmuc: IChuyenMuc) => {
        const { data } = await axios.post<{ chuyenmuc: IChuyenMuc }>(
            "http://localhost:8080/api/chuyenmuc",
            chuyenmuc
        );
        return data;
    }
);


export const removeChuyenMuc = createAsyncThunk(
    "chuyenmuc/removeChuyenMuc",
    async (id: string) => {
        await axios.delete(`http://localhost:8080/api/chuyenmuc/${id}`);
        return id;
    }
);

const ChuyenMucSlice = createSlice({
    name: "chuyenmuc",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChuyenMuc.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllChuyenMuc.fulfilled, (state, action) => {
                state.chuyenmuc= action.payload;
                state.loading = false;
            })
            .addCase(getAllChuyenMuc.rejected, (state) => {
                state.loading = false;
            })

            // Add category
            .addCase(createChuyenMuc.pending, (state) => {
                state.loading = true;
            })
            .addCase(createChuyenMuc.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createChuyenMuc.rejected, (state) => {
                state.loading = false;
            })

       

            // Delete Category
            .addCase(removeChuyenMuc.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeChuyenMuc.fulfilled, (state, action) => {
                state.chuyenmuc = state.chuyenmuc?.filter(
                    (category: IChuyenMuc) => category._id !== action.payload
                )
                state.loading = false;
            })
            .addCase(removeChuyenMuc.rejected, (state) => {
                state.loading = false;;
            })
    }
})

export default ChuyenMucSlice.reducer;