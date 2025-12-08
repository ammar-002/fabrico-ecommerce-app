import { CART_API_END_POINT, PRODUCTS_API_END_POINT } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { addCartItem, setCartItem } from "@/redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Shared/Navbar";
import Quantity from "./Quantity";
import { toast } from "react-toastify";
import { set } from "zod";

const ProductDetail = ({ }) => {
  const params = useParams();
  const productId = params.id;
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [isCarted, setIsCarted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product?.image)
  const navigate = useNavigate();
  const { User } = useSelector(store => store.user);
  const userId = User?._id;
  const clickHandle = async () => {
    try {
      const res = await axios.post(
        `${CART_API_END_POINT}/add-to-cart/${productId}`,
        { userId, productId, selectedSize, quantity },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsCarted(true);
        dispatch(addCartItem(res.data.cartProduct));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProductById = async () => {
    try {
      const res = await axios.get(
        `${PRODUCTS_API_END_POINT}/get-product/${productId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setProduct(res.data.product);
        setSelectedSize(res.data.product.size[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
      <Navbar />
      <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen pt-15 md:pt-10">
        {!product ? (
          <div className="h-[100vh] flex flex-col items-center justify-center ">
            {/* Loader */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-wide mt-8">
              Hold On Please! ✨
            </h1>
            <p className="text-gray-600 mt-3 text-base md:text-lg font-medium">
              We're fetching the product details for you...
            </p>
          </div>
        ) : (
          <div className="relative flex flex-col lg:flex-row gap-8 px-6 md:px-16 pt-24 pb-10">
            {/* Left: Images */}
            <div className="flex-1 flex flex-col items-center gap-6">
              <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-sm border-4 border-white/50 p-4">
                <img
                  src={mainImage || product?.image}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-110"
                />
              </div>
              {product?.secondImage && (
                <div className="flex gap-4 mt-2">
                  {[product?.image, product?.secondImage].map((img, index) => (
                    <div
                      key={index}
                      className={`relative rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:scale-110 
                     ${mainImage === img ? "ring-4 ring-blue-500 shadow-xl scale-105" : "ring-2 ring-gray-300 shadow-md"}`}
                      onClick={() => setMainImage(img)}
                    >
                      <img
                        src={img}
                        alt={`thumbnail-${index}`}
                        className="w-24 h-24 object-cover"
                      />
                      {mainImage === img && (
                        <div className="absolute inset-0 bg-blue-500/20"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 flex flex-col bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border border-white/50 gap-7 max-w-[90vw] mx-auto">
              <h1 className="text-xl md:text-3xl font-bold text-blue-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center justify-center gap-6">
                <span className="md:text-4xl text-xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {product.price} PKR
                </span>
                <span
                  className={`text-sm font-bold px-5 py-2 rounded-full shadow-md ${product.stock > 0
                    ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300"
                    : "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-2 border-red-300"
                    }`}
                >
                  {product.stock > 0 ? "✓ In Stock" : "✗ Sold Out"}
                </span>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-inner">
                <p className="text-gray-700 text-left text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  <span className="font-black text-blue-900 text-lg">Description: </span>
                  <span className="font-medium">{product.description}</span>
                </p>
              </div>

              <div className="flex md:flex  sm:flex-row md:justify-evenly items-start sm:items-center md:gap-4 gap-1 text-gray-700 px-1">
                <div className="bg-white px-2 py-3 rounded-xl shadow-md border border-gray-200">
                  <span className="text-sm md:text-base font-medium text-gray-600">
                    <span className="font-black text-blue-900">Category:</span>
                    <span className="ml-1 font-bold text-indigo-600">{product.category}</span>
                  </span>
                </div>
                <div className="bg-white px-2 py-3 rounded-xl shadow-md border border-gray-200 flex items-center gap-2">
                  <span className="text-sm md:text-base font-black text-blue-900">Sizes:</span>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="cursor-pointer border-2 border-blue-300 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 hover:border-blue-500 transition-all focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    {product.size.map((item, idx) => (
                      <option key={idx} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center bg-white px-6 py-4 rounded-xl shadow-md border border-gray-200 w-fit md:mx-auto">
                <span className="font-black text-blue-900 text-lg">Quantity:</span>
                <Quantity product={product} quantity={quantity} setQuantity={setQuantity} />
              </div>

              <button
                onClick={clickHandle}
                disabled={product.stock < 1 || isCarted}
                className={`
    text-white font-black text-lg py-4 px-10 rounded-2xl transition-all duration-300 w-fit mx-auto border-2 border-white/30
    ${product.stock < 1
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : isCarted
                      ? "bg-gradient-to-r from-green-400 to-green-600 cursor-not-allowed opacity-70"
                      : "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 hover:scale-105 shadow-xl hover:shadow-2xl"
                  }
  `}
              >
                {product.stock < 1
                  ? "⚠️ Out of Stock"
                  : isCarted
                    ? "✔️ Added to Cart"
                    : "🛒 Add to Cart"}
              </button>

            </div>

            <Link
              to="/products"
              title="Back to Products"
              className="absolute top-10 left-10 flex items-center gap-2 text-white font-bold px-5 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white/20"
            >
              <IoMdArrowRoundBack className="text-xl" /> Back
            </Link>
          </div>
        )}
      </div>
    </>

  )
};

export default ProductDetail; 