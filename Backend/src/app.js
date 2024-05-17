import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import categoryRouter from "./routes/category";
import productRouter from "./routes/product";
import uploadRouter from "./routes/upload";
import fileRouter from "./routes/fileRouter";
import ChuyenMuc from "./routes/ChuyenMuc";
import readLater from "./routes/readLater";


import chapterRouter from "./routes/chapterRouter";
import userRouter from "./routes/user";
import review from "./routes/review";

import path from "path";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Conect to MongoDB
connectDB(process.env.MONGODB_URL)
app.use('/', express.static(path.join( '/ttcs/webComics_NodeJs/Store-book-main/backend/src/middlewares/tmp')));
console.log('Serving PDFs from:', path.join('/ttcs/webComics_NodeJs/Store-book-main/backend/src/middlewares/tmp'));

// middleware
app.use("/api/categories", categoryRouter)
app.use("/api/products", productRouter)
app.use("/api/images", uploadRouter);
app.use("/api/files", fileRouter);
app.use("/api/chuyenmuc",ChuyenMuc)
app.use("/api/readLater", readLater);


app.use("/api",userRouter);

app.use("/api/chapters", chapterRouter)
app.use("/api/review", review)


export const viteNodeApp = app;
