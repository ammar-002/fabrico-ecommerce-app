import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({
        message: "User is not Authenticated!",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token!",
        success: false,
      });
    }
    // console.log(decode);
    req._id = decode.userId
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

export default isAuthenticated;
