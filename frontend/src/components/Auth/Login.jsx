import { USER_API_END_POINT } from "@/lib/utils";
import { setCurrUser } from "@/redux/UserSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Eye, EyeClosed, EyeOffIcon } from "lucide-react";
import z, { set } from "zod";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = LoginSchema.safeParse(input);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.log(errors);
      setError({
        email: errors.email?.[0] || "",
        password: errors.password?.[0] || "",
      });

      return;
    }

    // Clear errors if passed
    setError({ email: "", password: "" });
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setCurrUser(res.data.user));
        setTimeout(() => {
          navigate("/");
        }, 500);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Login to Your Account
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">
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
                {isPasswordVisible ? (<EyeOffIcon onClick={() => setIsPasswordVisible(false)} className="w-5 h-5 text-gray-500 absolute right-2 top-3 cursor-pointer" />) :
                  (<Eye onClick={() => setIsPasswordVisible(true)} className="w-5 h-5 text-gray-500 absolute right-2 top-3 cursor-pointer" />)}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg font-semibold transition-all duration-200
                         hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>


            {/* Signup Redirect */}
            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link className="text-blue-500 " to={"/user/sign-up"}>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

    </>
  );
};

export default Login;
