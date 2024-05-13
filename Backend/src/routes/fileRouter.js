import { Router } from "express";
import { File } from "../middlewares/file";

import { uploadFile } from "../controllers/file";
import { getFile } from "../controllers/file";


const router = Router();

router.post("/upload", File.single("file"), uploadFile);
router.get("/getFile", File.single("file"), getFile);


export default router;