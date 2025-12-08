// utility to convert file to data uri
import DataUriParser from "datauri/parser.js"
import path from "path";

//data uri is a way to represent binary data in an ascii string format
// it is used to embed small files directly into html or css files
// it is also used to upload files to cloudinary

const getDataUri = (file) => {
    const parser = new DataUriParser(); // create a new instance of datauri parser
    const extName = path.extname(file.originalname).toString(); // get the file extension
    return parser.format(extName, file.buffer);// convert the file to data uri and return it
}

export default getDataUri;

