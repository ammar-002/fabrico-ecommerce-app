import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-100 w-full mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold mb-3 text-white">Fabrico</h2>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            Discover your style with Fabrico — where fashion meets comfort.
            Trendy collections, quality fabrics, and styles that define you.
          </p>
          <div className="flex gap-3">
            <div className="p-2 bg-gray-200 hover:bg-gray-400 rounded-full text-blue-800 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="p-2 bg-gray-200 hover:bg-gray-400 rounded-full text-blue-800 cursor-pointer">
              <FaInstagram />
            </div>
            <div className="p-2 bg-gray-200 hover:bg-gray-400 rounded-full text-blue-800 cursor-pointer">
              <FaWhatsapp />
            </div>
            <div className="p-2 bg-gray-200 hover:bg-gray-400 rounded-full text-blue-800 cursor-pointer">
              <FaTiktok />
            </div>
          </div>
        </div>

        {/* Shop Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Shop Categories</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Jeans</li>
            <li className="hover:text-white cursor-pointer">Jackets </li>
            <li className="hover:text-white cursor-pointer">Shirts</li>
            <li className="hover:text-white cursor-pointer">Trousers</li>
            <li className="hover:text-white cursor-pointer">T-Shirts</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-400" /> +92 300 1234567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" /> support@fabrico.com
            </li>
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-blue-400 mt-1" /> Karachi,
              Pakistan
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-700 text-center py-3 text-sm text-gray-300">
        © {new Date().getFullYear()} <span className="font-semibold text-white">Fabrico</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
