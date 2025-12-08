import React from "react";
import SingleHP from "./SingleHP";
import { useSelector } from "react-redux";
import { Sparkles, TrendingUp } from "lucide-react";

const NewArrival = () => {
  const { allProducts } = useSelector((store) => store.products);
  const NewArrivals = [...allProducts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="py-16 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-6 py-2 rounded-full mb-4 shadow-sm">
            <Sparkles size={18} className="animate-pulse" />
            <span className="font-semibold text-sm uppercase tracking-wide">
              New Arrivals
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Latest <span className="text-blue-600">Collections</span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the newest additions to our collection. Fresh styles, trending designs, and premium quality.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-blue-600 rounded-full"></div>
            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {NewArrivals.map((item, index) => (
            <div
              key={item._id}
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out  ${index * 0.1}s both`
              }}
            >
              {/* New Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <TrendingUp size={14} />
                  <span className="text-xs font-bold">NEW</span>
                </div>
              </div>

              {/* Product Card */}
              <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <SingleHP product={item} />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {NewArrivals.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={40} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No new arrivals yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style>{`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`}</style>

    </div>
  );
};

export default NewArrival;