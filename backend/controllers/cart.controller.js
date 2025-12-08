import { Cart } from "../models/cart.model.js";
export const addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req._id;

    const {selectedSize,quantity} = req.body;
    if (!productId || !selectedSize||!quantity) {
      return res.status(400).json({ success: false, message: "Something Is Missing" });
    }
    const cartProduct = await Cart.create({
      productId,
      userId,
      selectedSize,
      quantity
    });
    await cartProduct.populate("productId");
    return res.status(200).json({
      message: "Added to Cart ",
      success: true,
      cartProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Somthing Went Wrong",
      success: false,
    });
  }
};
export const getCartProducts = async (req, res) => {
  try {
    const userId = req._id;
    const cartItems = await Cart.find({ userId }).populate("productId");
     
   return res.status(200).json({
      message: cartItems.length > 0 ? "Cart Items Found" : "Cart is Empty",
      success: true,
      cartItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something Went Wrong",
      success: false,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const product = await Cart.findByIdAndDelete(cartItemId);
    if(!product){
        return res.status(400).json({
            message:"Item not Present in Cart",
            success:false
        })
    }
    return res.status(200).json({
      message: "Item removed from cart",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Somethong Went Wrong",
      success: false,
    });
  }
};

 export const clearCart = async (req, res) => {
  try {
    const userId = req._id; 
  
    await Cart.deleteMany({ userId });
    return res.status(200).json({
      message: "Cart Cleared Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ 
      message: "Something Went Wrong",
      success: false,
    });
  }
};