"use client";
export const runtime = 'edge';

import { motion } from "framer-motion";

export default function IndustryInsightsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const insights = [
    {
      title: "Warehouse Capacity Trends",
      desc: "Analyzing global warehouse utilization, expansion strategies, and bottleneck forecasts for 2025 and beyond.",
      image: "/insights/diaoyan.png",
    },
    {
      title: "Driver Labor Shortages",
      desc: "Investigating the causes, implications, and mitigation strategies for driver shortages affecting supply chains worldwide.",
      image: "/insights/albinberlin.jpg",
    },
    {
      title: "Regulatory Developments",
      desc: "In-depth analysis of DOT, OSHA, FMCSA, Hazmat, and international compliance updates impacting logistics operations.",
      image: "/insights/brada.png",
    },
    {
      title: "Last-Mile Efficiency",
      desc: "Exploring innovations in delivery optimization, route planning, and urban logistics for faster and more reliable last-mile fulfillment.",
      image: "/insights/chanaka.jpg",
    },
    {
      title: "Automation & Smart Warehousing",
      desc: "Evaluating AI, robotics, IoT sensors, and WMS technologies that drive efficiency, accuracy, and scalability in modern warehouses.",
      image: "/insights/vkd.jpg",
    },
    {
      title: "Cross-Border Logistics Challenges",
      desc: "Insights on customs, international shipping regulations, trade compliance, and supply chain risk management across borders.",
      image: "/insights/elevate5.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20 space-y-24 pt-50">
      {/* 页面标题 */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        Industry Insights
      </motion.h1>

      {insights.map((item, idx) => (
        <motion.section
          key={idx}
          className="relative w-full flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          {/* 大图背景 */}
          <div className="w-full h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* 横向渐变分隔条 */}
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-6 mb-6"></div>

          {/* 文本内容 */}
          <div className="max-w-4xl text-center">
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
              viewport={{ once: true }}
            >
              {item.title}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
              viewport={{ once: true }}
            >
              {item.desc}
            </motion.p>
          </div>
        </motion.section>
      ))}

      {/* CTA 按钮 */}
      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <button className="px-12 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition duration-300">
          Request Full Research Access
        </button>
      </motion.div> */}
    </div>
  );
}
