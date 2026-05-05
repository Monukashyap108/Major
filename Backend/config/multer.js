import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination:"upload",
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
export const upload = multer({storage: storage})