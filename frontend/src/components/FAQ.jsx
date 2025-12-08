import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";

const faqs = [
  {
    question: "What is Fabrico and what kind of products do you offer?",
    answer:
      "Fabrico offers high-quality clothing for men and women with a focus on comfort, elegance, and modern design. Our collection includes casual wear, formal wear, and seasonal outfits tailored to your lifestyle.",
  },
  {
    question: "How can I place an order on Fabrico?",
    answer:
      "You can place your order easily by browsing through our collections, adding your favorite items to the cart, and checking out securely using your preferred payment method.",
  },
  {
    question: "What is your return or exchange policy?",
    answer:
      "We offer a 7-day return and exchange policy for all unused products in original packaging. If you receive a defective or wrong item, contact us immediately for assistance.",
  },
  {
    question: "Do you offer delivery all over Pakistan?",
    answer:
      "Yes, Fabrico delivers to all major cities and towns across Pakistan through reliable courier partners. Delivery usually takes 3–5 working days.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can reach us through the Contact Us page or by emailing support@fabrico.com. Our team is available Monday to Saturday, 9 AM to 6 PM.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="pt-20 w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 px-6 md:px-20">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <div className="bg-blue-100 rounded-full p-4">
              <HelpCircle className="text-blue-600" size={48} />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to the most common questions about our products, orders, and services.
            We're here to help make your shopping experience smooth!
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="max-w-4xl mx-auto space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 border-2 ${openIndex === index
                  ? "border-blue-500 shadow-2xl"
                  : "border-transparent hover:border-blue-200"
                }`}
            >
              <div
                className="flex justify-between items-center p-6 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`rounded-full p-2 mt-1 transition-colors ${openIndex === index ? "bg-blue-600" : "bg-blue-100"
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${openIndex === index ? "bg-white" : "bg-blue-600"
                      }`}></div>
                  </div>
                  <h2 className={`text-lg font-semibold transition-colors ${openIndex === index ? "text-blue-600" : "text-gray-800"
                    }`}>
                    {faq.question}
                  </h2>
                </div>
                <div className={`rounded-full p-2 transition-all ${openIndex === index ? "bg-blue-100 rotate-180" : "bg-gray-100"
                  }`}>
                  <ChevronDown
                    className={`transition-colors ${openIndex === index ? "text-blue-600" : "text-gray-600"
                      }`}
                    size={20}
                  />
                </div>
              </div>

              {/* Answer Section with Animation */}
              <div
                className={`transition-all duration-300 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
              >
                <div className="px-6 pb-6 pl-20">
                  <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-600">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default FAQ;