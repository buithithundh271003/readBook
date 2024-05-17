import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./Reducer/CategorySlice";
import ProductSlice from "./Reducer/ProductSlice"; 
import ChapterSlice from "./Reducer/Chapter"; 
import reviewSlice from "./Reducer/review"; 
import ChuyenMucslice from "./Reducer/ChuyenMuc";
import  readSlice from "./Reducer/readLater"







const store = configureStore({
    reducer: {
        Category: CategorySlice,
        Product: ProductSlice,
        Chapter:ChapterSlice,
        Review:reviewSlice,
        ChuyenMuc:ChuyenMucslice,
        ReadLater:readSlice,
     
     
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;