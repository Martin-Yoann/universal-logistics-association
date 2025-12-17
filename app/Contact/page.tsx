"use client";
import { motion } from "framer-motion";

export default function ContactPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-6 py-20 space-y-16 pt-50">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        Contact Us
      </motion.h1>

      {/* 简短说明 */}
      <motion.p
        className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        For membership inquiries, program information, or partnership opportunities, please reach out to us. 
        We are committed to providing timely responses and assisting you with all your logistics and supply chain related questions.
      </motion.p>

      {/* 联系信息 + 表单 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {/* 联系信息 */}
        <div className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Address:</span> 1101 E Arapaho Rd, #2422, Richardson, TX 75081
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> info@universelogisticsassociation.org
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Phone:</span> +1 (123) 456-7890
          </p>
        </div>

        {/* 简单联系表单 */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
            ></textarea>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl shadow-lg font-bold transition duration-300 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
