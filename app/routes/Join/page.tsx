"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function MembershipApplicationPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    title: "",
    membershipType: "",
    message: "",
    heardFrom: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ ...formData, files });
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 pt-50">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Membership Application
      </motion.h1>

      {submitted ? (
        <motion.div
          className="text-center text-green-600 text-xl font-semibold"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          Your application has been successfully submitted! We will contact you shortly.
        </motion.div>
      ) : (
        <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Image */}
          <motion.div
            className="md:w-1/2 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          >
            <img
              src="/join.png" // 这里替换为合适的物流相关图片
              alt="Membership"
              className="w-full h-auto rounded-xl shadow-lg object-cover"
            />
          </motion.div>

          {/* Right Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="md:w-1/2 bg-white shadow-lg rounded-xl p-8 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 mb-4">
              Fields marked with <span className="text-red-500">*</span> are required
            </p>

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Enter your company name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Your job title / role"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Membership Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Which membership are you interested in?
              </label>
              <input
                type="text"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
                placeholder="Type of membership"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Additional information or comments"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              />
            </div>

            {/* How did you hear about ULA */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                How did you hear about ULA?
              </label>
              <select
                name="heardFrom"
                value={formData.heardFrom}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                <option value="referral">Referral</option>
                <option value="find-warehouse-tool">Find-A-Warehouse Tool</option>
                <option value="directory">
                  Directory of Warehouse Logistics Providers & Partners
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Upload Supporting Documents */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Supporting Documents (Images / PDF)
              </label>
              <label className="inline-block px-6 py-3 bg-gray-100 text-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300 font-medium">
                Choose Files
                <input
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {files.length > 0 && (
                <ul className="mt-3 text-gray-600 list-disc list-inside">
                  {files.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
            >
              Submit Application
            </button>
          </motion.form>
        </div>
      )}
    </div>
  );
}
