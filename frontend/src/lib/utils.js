import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const PRODUCTS_API_END_POINT = "https://fabrico-ecommerce-app.vercel.app/api/v1/product";
export const USER_API_END_POINT =     "https://fabrico-ecommerce-app.vercel.app/api/v1/user";
export const CART_API_END_POINT =     "https://fabrico-ecommerce-app.vercel.app/api/v1/cart";
export const ORDER_API_END_POINT =    "https://fabrico-ecommerce-app.vercel.app/api/v1/order"
