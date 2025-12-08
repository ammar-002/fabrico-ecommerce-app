import React, { useState } from "react";
import { Link } from "react-router-dom";

const SingleHP = ({ product }) => {
  const [previewImage, setPreviewImage] = useState(product.image);
  return (
    <Link
      to={`/products/${product._id}`}
      className="block overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-100 transition-shadow duration-200 hover:shadow-md"
    >
      {/* Image Container */}
      <div onMouseEnter={() => setPreviewImage(product.secondImage)}
        onMouseLeave={() => setPreviewImage(product.image)}
        className="h-[30vh]   flex items-center justify-center p-1">
        <img
          src={previewImage || product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-5 border-t border-gray-100">
        {/* Product Title */}
        <h3 className="mb-3 text-lg font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-baseline gap-1 justify-center">
          <span className="text-2xl font-bold text-blue-600">
            {product.price}
          </span>
          <span className="text-sm font-medium text-gray-500">PKR</span>
        </div>
      </div>
    </Link>
  );
};

export default SingleHP;