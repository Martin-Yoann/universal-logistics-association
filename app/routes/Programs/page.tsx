"use client";
export const runtime = 'edge';

import { motion } from "framer-motion";

export default function ProgramsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const programs = [
    {
      title: "Warehouse Excellence Program",
      desc: "Comprehensive guidance on warehouse layout, WMS utilization, inventory optimization, audit preparation, hazard control and safety performance.",
      image: "/programs/bobrov.jpg",
    },
    {
      title: "Logistics Operations Network",
      desc: "Support for transportation planning, dispatch operations, last-mile optimization, fleet routing, regional logistics strategy and multi-region distribution.",
      image: "/programs/irwandoko.jpg",
    },
    {
      title: "Supply Chain Innovation Lab",
      desc: "Research and advisory on automation, robotics, AI-driven forecasting, IoT sensors, visibility platforms, digital twins and next-generation fulfillment.",
      image: "/programs/thejuanmarco.jpg",
    },
    {
      title: "Compliance & Risk Governance Center",
      desc: "Updates and guidance on DOT, OSHA, FMCSA, Hazmat, warehouse licensing, safety policies, liability mitigation and regulatory standards.",
      image: "/programs/nguyen.jpg",
    },
    {
      title: "Industry Standards & Benchmarking",
      desc: "Shared frameworks, KPI scorecards, performance benchmarks and operational models across ULA member organizations.",
      image: "/programs/pedersen.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20 space-y-24 pt-50">
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"
      >
        Programs & Services
      </motion.h1>

      {programs.map((item, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: isEven ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              isEven ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* 图片 */}
            <div className="md:w-1/2 relative group overflow-hidden rounded-2xl shadow-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-25 transition duration-500"></div>
            </div>

            {/* 文本 */}
            <div className="md:w-1/2">
              <motion.h3
                className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                }}
                viewport={{ once: true }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-gray-700 text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.2 },
                }}
                viewport={{ once: true }}
              >
                {item.desc}
              </motion.p>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <a href="/routes/Contact">
          <button className="px-12 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 hover:shadow-xl active:scale-95 cursor-pointer">
            Contact Us for Program Access
          </button>
        </a>
      </motion.div>
    </div>
  );
}
