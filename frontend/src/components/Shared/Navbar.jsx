import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LuSquareMenu } from "react-icons/lu";
import { IoMdHome } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { AiFillProduct } from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import axios from "axios";
import { USER_API_END_POINT } from "@/lib/utils";
import { setCurrUser } from "@/redux/UserSlice";
import { FaUserCircle } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { User } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setCurrUser(null));
        navigate("/user/login ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/get-user`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCurrUser(res.data.user)); // Redux set
        }else{
          dispatch(setCurrUser(null)); // Redux clear
        }

      } catch (error) {
        console.log(error)
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <div className="fixed z-10  w-[100vw] h-[10vh] bg-blue-900 ">
        <div className=" mx-auto w-[90%] md:w-[85%] h-[100%] flex items-center justify-between">
          <div className="logo text-gray-300 text-3xl font-bold font-[arial]">
            <Link to={"/"}>Fabrico</Link>
          </div>
          <div className="links">
            <ul className="hidden ml-10 md:flex gap-6  font-semibold   text-md cursor-pointer ">
              <li className=" text-white  hover:text-[var(--color-accent)] ">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-0.5 ${isActive ? "text-[var(--color-accent)]" : "text-white"}`
                  }
                >
                  <IoMdHome />
                  Home
                </NavLink>
                {" "}
              </li>
              <li className=" text-white hover:text-[var(--color-accent)] ">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `flex items-center gap-0.5 ${isActive ? "text-[var(--color-accent)]" : "text-white"}`
                  }
                >
                  <AiFillProduct />
                  Products
                </NavLink>

              </li>
              <li className=" text-white hover:text-[var(--color-accent)] ">
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    `flex items-center gap-0.5 ${isActive ? "text-[var(--color-accent)]" : "text-white"}`
                  }
                >
                  <IoCall />
                  Contact
                </NavLink>

              </li>
              <li className=" text-white hover:text-[var(--color-accent)] ">
                <NavLink
                  to="/faqs"
                  className={({ isActive }) =>
                    `flex items-center gap-0.5 ${isActive ? "text-[var(--color-accent)]" : "text-white"}`
                  }
                >
                  <FaQuestion />
                  FAQs
                </NavLink>

              </li>
            </ul>
          </div>
          <div onClick={() => setOpen(true)} className="menu-icon ">
            <LuSquareMenu className="text-[var(--color-secondary)] text-4xl -ml-11 cursor-pointer md:hidden" />
          </div>
          <div className="cta flex items-center cursor-pointer  gap-2 md:gap-5">
            {User ? (
              <Popover>
                <PopoverTrigger>
                  <Avatar className={"cursor-pointer bg-gray-300 border-2 border-white h-9 w-9"}>
                    <AvatarImage src={User?.profilePic || "/avatar.png"} alt="ProfilePic" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-4 rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                    <img
                      src={User?.profilePic || "/avatar.png"}
                      alt="ProfilePic"
                      className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {User?.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">{User?.email}</p>
                    </div>
                  </div>

                  {/* Options */}
                  <button
                    onClick={logoutHandler}
                    className="cursor-pointer flex items-center gap-2 w-full text-red-600 text-sm font-semibold hover:bg-red-100 px-3 py-2 rounded-lg transition-all duration-200"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <Link title="Sign In To Your Account" to="/user/login">
                <FaUserCircle className="text-4xl text-gray-200  " />
              </Link>
            )}
            <Link
              to={"/cart/products"}
              className="relative flex items-center justify-center cursor-pointer p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
            >
              <FaCartShopping className="text-2xl text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cartItems?.length || 0}
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* mobile Menu */}
      {open && (
        <div className="mobile-menu fixed top-0 left-0 w-full h-auto bg-black/90 backdrop-blur-md shadow-lg rounded-b-2xl z-50 p-4 animate-slide-down ">
          {/* Close Button */}
          <div
            onClick={() => setOpen(false)}
            className="close text-4xl text-blue-500 flex justify-end cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <IoCloseCircleSharp />
          </div>

          {/* Menu List */}
          <ul className="flex flex-col items-center justify-center gap-4 mt-4 text-lg font-semibold text-white">
            {/* Home */}
            <li className="hover:text-blue-400 transition-colors duration-300">
              <Link to="/" className="flex items-center gap-2">
                <IoMdHome className="text-blue-400 text-xl" />
                Home
              </Link>
            </li>

            {/* Products */}
            <li className="hover:text-blue-400 transition-colors duration-300">
              <Link to="/products" className="flex items-center gap-2">
                <AiFillProduct className="text-blue-400 text-xl" />
                Products
              </Link>
            </li>

            {/* Contact */}
            <li className="hover:text-blue-400 transition-colors duration-300">
              <Link to="/contact-us" className="flex items-center gap-2">
                <IoCall className="text-blue-400 text-xl" />
                Contact
              </Link>
            </li>

            {/* FAQs */}
            <li className="hover:text-blue-400 transition-colors duration-300">
              <Link to="/faqs" className="flex items-center gap-2">
                <FaQuestion className="text-blue-400 text-xl" />
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
