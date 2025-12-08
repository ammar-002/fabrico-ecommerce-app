import React from 'react';
import { Star, Edit2, Trash2 } from 'lucide-react';
 
import SideBar from '../Dashboard/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PRODUCTS_API_END_POINT } from '@/lib/utils';
import { removeProduct } from '@/redux/ProductSlice';
import useGetAllProducts from '@/components/customHooks/useGetAllProducts';

const AllProductsMain = () => {
  const { allProducts } = useSelector(store => store.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`${PRODUCTS_API_END_POINT}/delete/${id}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(removeProduct(id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useGetAllProducts();
  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 overflow-auto">
  

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
            <Link
              title="Add New Product"
              to={"/dashboard/new-product"}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <span className="text-lg">+</span>
              <span className="font-medium">ADD NEW PRODUCT</span>
            </Link>
          </div>

          {allProducts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map((product, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-xl hover:scale-[1.03] transition-transform duration-300 relative"
                >
                  {/* Edit/Delete Icons */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/update-product/${product?._id}`)}
                      className="p-1 hover:bg-gray-100 rounded cursor-pointer" 
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5 text-blue-600" />
                    </button>
                    <button
                      onClick={() => deleteHandler(product?._id)}
                      className="p-1 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-600 cursor-pointer" />
                    </button>
                  </div>

                  {/* Product ID */}
                  <p className="text-[10px] text-gray-400 mb-1">ID: {product._id}</p>

                  {/* Product Image + Info */}
                  <div className="flex gap-4 mb-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">📦</span>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 break-words max-h-12 overflow-hidden">
                        {product?.title}
                      </h3>
                      <div className="mb-2">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                          {product?.category}
                        </span>
                      </div>
                      <p className="text-xl font-bold text-blue-600">{product.price} PKR</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-blue-700 font-medium">Stock</span>
                        <span className={product?.stock?"text-sm font-semibold text-gray-900":"text-sm font-semibold text-red-600"}>{product?.stock||"sold" }</span>
                      </div>

                      {product?.size && (
                        <div className="flex flex-wrap gap-1 items-center">
                          <span className="text-xs text-blue-700 font-medium">Sizes:</span>
                          <span className="text-sm text-gray-900">{product.size.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-xl font-semibold mt-20">
              No Products Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsMain;
