import multer from "multer";
const storage = multer.memoryStorage(); // store files in RAM/temporary memory as buffer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new Error("Only .jpeg and .png files are allowed!")); // reject the file if not jpeg or png
    }
    cb(null, true);
  },
});
export const singleUpload = upload;

// for multiple files
export const multipleUpload = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "secondImage", maxCount: 1 },
  
]);
