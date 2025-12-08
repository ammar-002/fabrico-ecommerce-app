import React, { useState, useEffect } from "react";
import SideBar from "../Dashboard/SideBar";
 import { toast } from "react-toastify";
import axios from "axios";
import { PRODUCTS_API_END_POINT } from "@/lib/utils";
import { updateProduct } from "@/redux/ProductSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
 

export default function UpdateProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    image: null, // ✅ Changed to null for file
    secondImage: null, // ✅ Changed to null for file
    category: "",
    size: [],
    price: "",
    stock: "",
    imagePreview: "", // ✅ Separate preview state
    secondImagePreview: "", // ✅ Separate preview state
  });

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${PRODUCTS_API_END_POINT}/get-product/${id}`, {
          withCredentials: true,
        });
        const productData = res.data.product  ;
        console.log(productData);
         
        setProduct({
          title: productData.title || "",
          description: productData.description || "",
          image: null, // Keep as null (not a File yet)
          secondImage: null, // Keep as null
          category: productData.category || "",
          size: Array.isArray(productData.size) ? productData.size : [],
          price: productData.price || "",
          stock: productData.stock || "",
          imagePreview: productData.image || "", // ✅ Set existing image URL
          secondImagePreview: productData.secondImage || "", // ✅ Set existing image URL
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const toggleSize = (value) => {
    setProduct((prev) => ({
      ...prev,
      size: prev.size.includes(value)
        ? prev.size.filter((s) => s !== value)
        : [...prev.size, value],
    }));
  };

  const submitHandler = async () => {
    try {
      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
 
      product.size.forEach((sz) => {
        formData.append("size", sz);
      });

     
      if (product.image instanceof File) {
        formData.append("image", product.image);
      }
      if (product.secondImage instanceof File) {
        formData.append("secondImage", product.secondImage);
      }

      const res = await axios.post(
        `${PRODUCTS_API_END_POINT}/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(updateProduct(res.data.updatedProduct));
        navigate("/dashboard/all-products");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="min-h-screen w-full bg-gray-100 flex justify-center py-3">
          <div className="w-full max-w-5xl bg-white rounded-xl shadow-md p-7">
            <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
              Update Product
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter product title"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter description"
                rows="4"
              ></textarea>
            </div>

            {/* Main Image */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">
                Main Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProduct({ 
                      ...product, 
                      image: file, 
                      imagePreview: URL.createObjectURL(file) 
                    });
                  }
                }}
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600"
              />
              {/* ✅ Preview - Shows both existing and new images */}
              {product.imagePreview && (
                <div className="mt-3">
                  <img
                    src={product.imagePreview}
                    alt="Main Preview"
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                  {!product.image && (
                    <p className="text-xs text-gray-500 mt-1">Current image</p>
                  )}
                  {product.image && (
                    <p className="text-xs text-green-600 mt-1">New image selected</p>
                  )}
                </div>
              )}
            </div>

            {/* Second Image */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">
                Second Image (Optional)
              </label>
              <input
                type="file"
                name="secondImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProduct({ 
                      ...product, 
                      secondImage: file, 
                      secondImagePreview: URL.createObjectURL(file) 
                    });
                  }
                }}
                className="w-full p-2 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600"
              />
              {/* ✅ Preview - Shows both existing and new images */}
              {product.secondImagePreview && (
                <div className="mt-3">
                  <img
                    src={product.secondImagePreview}
                    alt="Second Preview"
                    className="w-40 h-40 object-cover rounded-lg border"
                  />
                  {!product.secondImage && (
                    <p className="text-xs text-gray-500 mt-1">Current image</p>
                  )}
                  {product.secondImage && (
                    <p className="text-xs text-green-600 mt-1">New image selected</p>
                  )}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">
                Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="Trouser">Trouser</option>
                <option value="Jeans">Jeans</option>
                <option value="Shirt">Shirt</option>
                <option value="Jacket">Jacket</option>
              </select>
            </div>

            {/* Sizes */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">Sizes</label>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)}
                    className={`px-4 py-2 border rounded-lg text-sm  ${
                      product.size.includes(sz)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="PKR"
              />
            </div>

            {/* Stock */}
            <div className="mb-6">
              <label className="block mb-1 text-gray-700 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Quantity"
              />
            </div>

            {/* Button */}
            <button
            disabled={!product.title || !product.description || !product.category || !product.price || !product.stock}
              onClick={submitHandler}
              className="cursor-pointer w-full bg-blue-900 text-white p-3 rounded-lg text-lg hover:bg-blue-800 transition"
            >
               {loading ? "Updating Product..." : "Update Product"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}