import React from "react";
import { Sparkles } from "lucide-react";

const SalesSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Main Banner */}
      <div className="relative w-full h-[30vh] bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-6">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative   text-center">
          {/* Small Icon */}
          <div className="inline-block mb-3">
            <Sparkles className="text-yellow-300 animate-pulse" size={28} />
          </div>

          {/* Main Heading - Same Content */}
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-2">
            Summer Sale - Up to 50% Off
          </h2>
          <p className="text-blue-200 text-lg md:text-xl font-medium">
            Selected Items!
          </p>
        </div>

        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default SalesSection;