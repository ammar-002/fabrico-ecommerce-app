import express from "express";
import {getCurrUser, Login, Logout, RegisterUser, updateUser } from "../controllers/user.controller.js";
import { singleUpload } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const userRouter = express.Router();
userRouter.route("/register").post(async (req, res, next) => {
  // for handling multer errors
  singleUpload.single("profilePic")(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: err.message,
        success: false,
      });
    }
    next();
  });
}, RegisterUser);

userRouter.route("/login").post(Login);
userRouter.route("/get-user").get(isAuthenticated,getCurrUser);
userRouter.route("/logout").get(isAuthenticated ,Logout);
userRouter.route("/updateprofile").post(isAuthenticated, (req, res, next) => {
  singleUpload.single("profilePic")(req, res, function (err) {
    if (err) {
        return res.status(400).json({
        message: err.message,
        success: false,
      });
    }
    next();
  });
}, updateUser);
export default userRouter;
