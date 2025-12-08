import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { multipleUpload } from "../middlewares/multer.js";
import { addProduct, deleteAllProducts, deleteProductById, getAllProducts, getProductById,   updateProduct, updateProductStock } from "../controllers/product.controller.js";

const productRouter = express.Router();
productRouter.route("/add-product").post(isAuthenticated,multipleUpload,addProduct);
productRouter.route("/get-all-products").get(getAllProducts)
productRouter.route("/delete/:id").delete(isAuthenticated,deleteProductById)
productRouter.route("/delete-all").delete(isAuthenticated,deleteAllProducts)
productRouter.route("/update-product/:id").post(isAuthenticated,multipleUpload,updateProduct)
productRouter.route("/get-product/:id").get(getProductById)
productRouter.route("/update-product-stock/:id").post(isAuthenticated,updateProductStock)
export default productRouter;
