import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setCurrFilter } from "@/redux/filterSlice";
import { Link } from "react-router-dom";

const CategorySection = () => {
  const dispatch = useDispatch();
  const Categories = [
    {
      name: "T-Shirt",
      img: "category/t-sh.jpg",
    },
    {
      name: "Jeans",
      img: "category/jeans.jpg",
    },
    {
      name: "Jacket",
      img: "category/jackets.jpg",
    },
    {
      name: "Shirt",
      img: "category/shirt.jpg",
    },
    {
      name: "Trouser",
      img: "category/trouser.webp",
    },
  ];
  
  return (
    <div className="my-16 mx-auto w-[90%] md:w-[80%]">
      <div className="category">
        <div className="headings mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
            <h3 className="px-4 text-sm font-semibold tracking-widest text-blue-500 uppercase">
              Our Categories
            </h3>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold  text-blue-800 mb-5">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium fashion essentials
          </p>
        </div>
        
        <Carousel className="w-[70vw]   mx-auto">
          <CarouselContent className="-ml-1">
            {Categories.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3 rounded-lg m-1"
              >
                <div className="p-1">
                  <div 
                    className="card bg-blue-50 group relative flex justify-center items-center h-[35vh] bg-no-repeat w-[100%] bg-contain bg-center rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 transform hover:-translate-y-2"
                    style={{ backgroundImage: `url(' ${item.img}')` }}
                  >
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-blue/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-500"></div> */}
                    
                    {/* <div className="absolute inset-0 bg-blue-100/0 group-hover:bg-blue-600/10 transition-all duration-500"></div> */}
                    
                    <Link 
                      to={`/products/# ${item.name}`} 
                      onClick={() => dispatch(setCurrFilter(item.name.toLowerCase()))}
                      className="relative z-10"
                    >
                      <Button 
                        variant="ghost"
                        className="cursor-pointer px-8 py-6 text-lg font-bold bg-white/90 hover:bg-white text-blue-900 hover:text-blue-700 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 border-2 border-white/50 hover:border-blue-400"
                      >
                        {item.name}
                      </Button>
                    </Link>
                    
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="cursor-pointer border-none bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:from-blue-800 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
          <CarouselNext className="cursor-pointer border-none bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:from-blue-800 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategorySection;