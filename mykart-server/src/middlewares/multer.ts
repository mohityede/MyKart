import multer from "multer";
import { v4 as uid } from "uuid";
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    const id = uid();
    const fileExt = file.originalname.split(".").pop();
    const fileName = id + "." + fileExt;
    callback(null, fileName);
  },
});

export const singleFileUpload = multer({ storage }).single("photo");
