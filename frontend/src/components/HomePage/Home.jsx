import React, { useState } from "react";
import Hero from "./Hero";
import Navbar from "../Shared/Navbar";
import CategorySection from "./CategorySection";
import HotProducts from "./NewArrival";
import Footer from "../Shared/Footer";
import SalesSection from "./SalesSection";
import useGetAllProducts from "../customHooks/useGetAllProducts";

const Home = () => {
  useGetAllProducts();
  return (
    <div className=" overflow-x-hidden ">
      <Navbar />
      <div className="mt-[10vh]">
        <Hero />
        <CategorySection />
        <SalesSection />
        <HotProducts />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
