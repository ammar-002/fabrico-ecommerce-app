import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const slides = [
    {
      img: " /banners/welcome.jpg",
      title: "Welcome to Fabrico!",
      subtitle: "Discover premium men's T-Shirts, Jeans, Jackets & more.",
      highlight: "Fabrico!"
    },
    {
      img: " /banners/sl-2.jpg",
      title: "New Arrivals",
      subtitle: "Fresh styles for every season.",
      highlight: "Arrivals"
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-[35vh] md:h-[70vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-right md:bg-center flex items-center justify-center"
              style={{ backgroundImage: `url( ${slide.img})` }}
            >
              {/* Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 md:from-white/80 md:via-white/60 md:to-transparent"></div>
              
              <div className="relative z-10 text-center md:text-left w-[90%] md:w-[70%] flex flex-col gap-5 md:gap-6">
                {/* Title with enhanced styling */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white md:text-blue-900">
                  {slide.title.split(slide.highlight)[0]}
                  <span className="relative inline-block">
                    <span className="relative z-10">{slide.highlight}</span>
                    <span className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-blue-400 rounded-full"></span>
                  </span>
                  {slide.title.split(slide.highlight)[1]}
                </h1>

                {/* Subtitle with better contrast */}
                <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-gray-100 md:text-blue-800 md:max-w-[60%] leading-relaxed">
                  {slide.subtitle}
                </h2>

                {/* CTA Button */}
                <Button
                  variant="ghost"
                  className="bg-blue-900 text-white text-base md:text-lg font-bold hover:bg-blue-800 hover:scale-105 transition-all duration-300 w-fit mx-auto md:mx-0 px-8 py-6 shadow-lg"
                >
                  <Link to="/products">See Collection →</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        /* Enhanced Swiper Navigation Buttons */
        .swiper-button-next,
        .swiper-button-prev {
          color:black
          width: 45px;
          height: 45px;
           
        }
        
        

        /* Enhanced Pagination Dots */
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: #1e3a8a;
          width: 32px;
          border-radius: 6px;
        }

        /* Text animations */
        .swiper-slide-active h1 {
          animation: slideInUp 0.8s ease-out;
        }

        .swiper-slide-active h2 {
          animation: slideInUp 1s ease-out;
        }

        .swiper-slide-active button {
          animation: slideInUp 1.2s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 35px;
            height: 35px;
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;