import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const [previewImage, setPreviewImage] = useState(null);
  
  return (
    
    <Link
      to={`/products/${product._id}`}
      className="group w-65 block overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative"
    >
      {/* Sold Out Badge */}
      {product.stock < 1 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md z-10">
          Sold Out
        </div>
      )}

      {/* Product Image */}
      <div
        onMouseEnter={() => setPreviewImage(product.secondImage)}
        onMouseLeave={() => setPreviewImage(null)}
        className="h-[30vh] bg-gray-50 flex items-center justify-center overflow-hidden"
      >
        <img
          src={previewImage || product.image}
          alt={product.title}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-5 border-t border-gray-100">
        {/* Product Title */}
        <h3 className="mb-3 text-base text-center font-semibold text-gray-900   min-h-[3rem] text-wrap">
          {product.title}
        </h3>

        {/* Price */}
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

export default Product;