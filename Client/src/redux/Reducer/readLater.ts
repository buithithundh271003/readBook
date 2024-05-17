import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IReadLater from "../../interface/readLater";

interface initialState {
    readLaters: IReadLater[];
    loading: boolean;
    error: string | undefined;
}

const initialState: initialState = {
    readLaters: [],
    loading: false,
    error: "",
};

export const getAllReadLater = createAsyncThunk(
    "readLater/getreads",
    // async (query?: string) => {
    //     const {
    //         data: { reads }
    //     } = await axios.get<{ reads: IReadLater[] }>(
    //         `http://localhost:3000/api/readLater${query ?? ""}`
    //     );
    //     console.log(reads);
    //     return reads;
    // }
    async () => {
        console.log("18rv");
    
            const { data } = await axios.get<{ AllreadLater
                : IReadLater[] }>(
                "http://localhost:3000/api/readLater"
            );
            console.log(data );
        console.log("------------25rv-------------");
    
            return data.AllreadLater;
        }
);

export const createReadLater = createAsyncThunk(
    "readLater/addReads",
    async (reads: IReadLater) => {
        const { data } = await axios.post<{
            data: any; reads: IReadLater 
}>(
            "http://localhost:3000/api/readLater",
            reads
        );

        return data;
    }
);



export const removeReadLater = createAsyncThunk(
    "readLater/removeReads",
    async (id: string) => {
        await axios.delete(`http://localhost:3000/api/readLater/${id}`);

        return id;
    }
);

const readSlice = createSlice({
    name: "readLater",
    initialState,
    reducers: {
        getReadByCate: (state, action) => {
            state.readLaters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllReadLater.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllReadLater.fulfilled, (state, action) => {
                state.readLaters = action.payload;
                state.loading = false;
            })
            .addCase(getAllReadLater.rejected, (state) => {
                state.loading = false;
            })
            // Add Product
            .addCase(createReadLater.pending, (state) => {
                state.loading = true;
            })
          
            .addCase(createReadLater.rejected, (state) => {
                state.loading = false;
            })

            .addCase(createReadLater.fulfilled, (state, action) => {
                state.loading = false;

                const newItem = action.payload.data;

                const checkItem = state.readLaters.findIndex(item => item.productId === newItem.productId);

                if (checkItem === -1) {
                    
                    state.readLaters = [...state.readLaters, newItem];

                }
            })
         
            // Delete Product
            .addCase(removeReadLater.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeReadLater.fulfilled, (state, action) => {
                state.readLaters = state.readLaters?.filter(
                    (cart: IReadLater) => cart._id !== action.payload
                );

                state.loading = false;
            })
            .addCase(removeReadLater.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { getReadByCate } = readSlice.actions;
export default readSlice.reducer;

