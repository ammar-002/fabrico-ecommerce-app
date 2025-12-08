

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/Home";
import ProductsMain from "./components/Products/ProductsMain";
import ProductDetail from "./components/Products/ProductDetail";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import CartsMain from "./components/Cart/CartsMain";
import Contact from "./components/Contact";
import FAQ from "./components/FAQ";
import PlaceOrderMain from "./components/Order/PlaceOrderMain";
import DashboardMain from "./components/Admin/Dashboard/DashboardMain";
import AllProductsMain from "./components/Admin/Products/AllProducts";
import OrderListMain from "./components/Admin/Orders/OrderListMain";
import OrderDetails from "./components/Admin/Orders/OrderDetails";
import NewProduct from "./components/Admin/Products/NewProduct";
import OrderSuccessPage from "./components/Order/OrderSuccessPage";
import UpdateProduct from "./components/Admin/Products/UpdateProduct";
import CancelPage from "./components/Order/CancelPage";
import SuccessPage from "./components/Order/SuccessPage";
import ProtectedRoutes from "./components/utils/ProtectedRoutes";
import isAdmin from "./components/utils/IsAdmin";
import IsAdmin from "./components/utils/IsAdmin";
import { Bounce, ToastContainer } from "react-toastify";


const App = () => {

  return (
    <>
      <ToastContainer
       
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="/user/sign-up" element={<SignUp />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsMain />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart/products" element={<CartsMain />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart/products/check-out-now" element={<PlaceOrderMain />} />
        </Route>
        <Route element={<IsAdmin />}>
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/dashboard/all-products" element={<AllProductsMain />} />
          <Route path="/dashboard/order-list" element={<OrderListMain />} />
          <Route path="/dashboard/order-detail/:id" element={<OrderDetails />} />
          <Route path="/dashboard/new-product" element={<NewProduct />} />
          <Route path="/check-out-now/success" element={<OrderSuccessPage />} />
          <Route path="/dashboard/update-product/:id" element={<UpdateProduct />} />
          <Route path="/check-out-now/cancel" element={<CancelPage />} />
          <Route path="/check-out-now/success/:id" element={<SuccessPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
