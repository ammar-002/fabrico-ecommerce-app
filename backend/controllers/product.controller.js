import { Product } from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/DataUri.js";

export const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, size, stock } = req.body;

    if (!title || !description || !price || !category || !stock || !size) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    let sizeArray = [];
if (Array.isArray(size)) {
  sizeArray = size;
} else if (typeof size === "string") {
  sizeArray = size.split(",");
}
    // handle image upload
    const files = req.files;
    // console.log(files);  //yahan sai file ka original name bhi nikaal saktay ho, log for testing

    // initialize image url variable
    let product_image_url = "";
    let secondImage_url = "";

    // upload image to cloudinary
    if (files?.image) {
      // datauri function to convert file to data uri(base64 string, means image ko string mai convert karna)
      const fileUri = getDataUri(files.image[0]);
      const myCloud = await cloudinary.uploader.upload(fileUri.content);
      product_image_url = myCloud.secure_url;
    }
    // upload second image to cloudinary
    if (files?.secondImage) {
      const fileUri2 = getDataUri(files.secondImage[0]); // second image[0]
      const myCloud2 = await cloudinary.uploader.upload(fileUri2.content);
      secondImage_url = myCloud2.secure_url;
    }

    const product = await Product.create({
      title,
      description,
      image: product_image_url,
      secondImage: secondImage_url,
      price,
      category,
      size:sizeArray,
      stock,
      createdBy: req._id, // from isAuthenticated middleware
    });

    return res.status(201).json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

 

export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(400).json({
        message: "Product not found with this ID",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};
export const deleteAllProducts = async (req, res) => {
  try {
    const deleteResult = await Product.deleteMany();

    if (deleteResult.deletedCount === 0) {
      return res.status(400).json({
        message: "Products Not Found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All Products Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
      });
    }

    // Extract text fields
    let { title, description, price, category, stock, size } = req.body;

    // Convert size into array (FormData sends multiple "size" keys)
    if (!Array.isArray(size)) {
      if (size) size = [size];
      else size = [];
    }

    const files = req.files;
    let product_image_url;
    let secondImage_url;

    // Upload new image if provided
    if (files?.image) {
      const fileUri = getDataUri(files.image[0]);
      const myCloud = await cloudinary.uploader.upload(fileUri.content);
      product_image_url = myCloud.secure_url;
    }

    // Upload second image if provided
    if (files?.secondImage) {
      const file2Uri = getDataUri(files.secondImage[0]);
      const myCloud2 = await cloudinary.uploader.upload(file2Uri.content);
      secondImage_url = myCloud2.secure_url;
    }

    // Build update object
    const updatedData = {
      title,
      description,
      price,
      category,
      stock,
      size, // ✅ IMPORTANT!
    };

    // Update images ONLY if new file was uploaded
    if (product_image_url) updatedData.image = product_image_url;
    if (secondImage_url) updatedData.secondImage = secondImage_url;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );

    return res.status(200).json({
      message: "Product Updated Successfully!",
      success: true,
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};


export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "Product not found with this ID",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product Found",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      message: "Products Found",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};
 
export const updateProductStock = async (req, res) => {
  try {
    const productId = req.params.id;
    let { newStock } = req.body;
         
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { stock: newStock },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(400).json({
        message: "Product not found with this ID",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product Stock Updated Successfully!",
      success: true,
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};