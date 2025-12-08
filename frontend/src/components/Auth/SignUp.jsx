import { USER_API_END_POINT } from "@/lib/utils";
import { setCurrUser } from "@/redux/UserSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Eye, EyeOffIcon } from "lucide-react";
import z from "zod";
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const signupSchema = {
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    phoneNumber: z.string().min(11, "Phone number must be minimum 11 digits").max(11, "Phone number must be maximum 11 digits ").startsWith("0", "Phone number must start with '0'"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  };
  const [input, setInput] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "user",
  });
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = z.object(signupSchema).safeParse(input);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.log(errors);
      setError({
        fullName: errors.fullName?.[0] || "",
        phoneNumber: errors.phoneNumber?.[0] || "",
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
      });
      return;
    }
    
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("profilePic", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message)
        if (res.data.user.role === "user") {
          navigate("/user/login");
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Full Name
              </label>
              {error.fullName && (
                <p className="text-red-500 text-sm mb-1">{error.fullName}</p>
              )}
              <input
                onChange={changeHandler}
                name="fullName"
                value={input.fullName}
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              {error.email && (
                <p className="text-red-500 text-sm mb-1">{error.email}</p>
              )}
              <input
                onChange={changeHandler}
                name="email"
                value={input.email}
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Phone Number
              </label>
              {error.phoneNumber && (
                <p className="text-red-500 text-sm mb-1">{error.phoneNumber}</p>
              )}
              <input
                onChange={changeHandler}
                name="phoneNumber"
                value={input.phoneNumber}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Password
              </label>
              {error.password && (
                <p className="text-red-500 text-sm mb-1">{error.password}</p>
              )}
              <div className="relative">
                <input
                  onChange={changeHandler}
                  name="password"
                  value={input.password}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {isPasswordVisible?(<EyeOffIcon onClick={()=>setIsPasswordVisible(false)} className="w-5 h-5 text-gray-500 absolute right-2 top-3 cursor-pointer" />):
                (<Eye  onClick={()=>setIsPasswordVisible(true)} className="w-5 h-5 text-gray-500 absolute right-2 top-3 cursor-pointer" />)}
              </div>
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Profile Picture
              </label>
              <input
                onChange={changeFileHandler}
                type="file"
                accept="image/*"
                className="cursor-pointer w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg font-semibold transition-all duration-200
                         hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <Link
              to={"/user/login"}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </>
  );
};

export default SignUp;
