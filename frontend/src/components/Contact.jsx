import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="w-full pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-6 md:px-20">
        {/* Header Section */}

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">

          {/* Email Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-blue-600">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 rounded-full p-5">
                <Mail className="text-blue-600" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-3">Email Us</h3>
            <p className="text-gray-600 text-center mb-4">
              Send us an email anytime
            </p>
            <a
              href="mailto:support@fabrico.com"
              className="block text-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              support@fabrico.com
            </a>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-green-600">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-5">
                <Phone className="text-green-600" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-3">Call Us</h3>
            <p className="text-gray-600 text-center mb-4">
              Mon-Sat from 9am to 8pm
            </p>
            <a
              href="tel:+923001234567"
              className="block text-center text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              +92 300 1234567
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-purple-600">
            <div className="flex justify-center mb-6">
              <div className="bg-purple-100 rounded-full p-5">
                <MapPin className="text-purple-600" size={32} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-3">Visit Us</h3>
            <p className="text-gray-600 text-center mb-4">
              Our office location
            </p>
            <p className="text-center text-purple-600 font-semibold">
              Karachi, Sindh<br />Pakistan
            </p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              How Can We Help You?
            </h2>
            <p className="text-gray-600">
              Choose the best way to reach us based on your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Hours */}
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="bg-blue-600 rounded-lg p-3">
                <Clock className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">Business Hours</h4>
                <div className="space-y-1 text-gray-700">
                  <p className="font-medium">Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p className="font-medium">Saturday: 10:00 AM - 6:00 PM</p>
                  <p className="font-medium">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Quick Response */}
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="bg-green-600 rounded-lg p-3">
                <MessageCircle className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">Quick Response</h4>
                <p className="text-gray-700 leading-relaxed">
                  We typically respond to emails within 24 hours. For urgent matters,
                  please call us directly during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-12 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6 text-blue-100">
            We're excited to hear from you and help with your clothing needs!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@fabrico.com"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Send Email
            </a>
            <a
              href="tel:+923001234567"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all shadow-lg"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Contact;