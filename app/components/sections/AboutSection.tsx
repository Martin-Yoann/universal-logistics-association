"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 标题区 */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            About <span className="text-blue-600">ULA</span> — Your Logistics
            Partner
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over a decade, ULA has been driving excellence in warehousing
            and logistics. We empower supply chain professionals with best
            practices, standards, and a global community to navigate change,
            enhance efficiency, and accelerate growth.
          </p>
        </motion.div>

        {/* 核心亮点 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          {[
            {
              icon: "🚚",
              title: "Efficient Transport",
              desc: "Optimize delivery routes and reduce transit time.",
            },
            {
              icon: "🏭",
              title: "Smart Warehousing",
              desc: "Advanced warehouse management solutions.",
            },
            {
              icon: "🌐",
              title: "Global Network",
              desc: "Leverage international logistics partnerships.",
            },
            {
              icon: "📈",
              title: "Data-Driven Insights",
              desc: "Monitor supply chain performance with analytics.",
            },
            {
              icon: "⚡",
              title: "Fast & Reliable",
              desc: "Ensure timely deliveries with robust processes.",
            },
            {
              icon: "🤝",
              title: "Trusted Partnerships",
              desc: "Build long-term relationships grounded in reliability.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
              variants={fadeUpVariant}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="text-blue-600 text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 行业案例模块 - 瀑布滚动 + hover 动画 */}
<motion.section
  className="mb-20"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  <motion.h3
    className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center"
    variants={fadeUpVariant}
  >
    Industry Case Studies
  </motion.h3>

  <div className="flex flex-col space-y-20">
    {[
      {
        title: "Smart Warehouse Implementation",
        desc: "Helped a 3PL company optimize storage by 35% using automation.",
        image: "/Industry/CANGKU.jpeg",
      },
      {
        title: "Global Supply Chain Optimization",
        desc: "Reduced delivery times by 20% for an international retailer.",
        image: "/Industry/GANGKOU.jpg",
      },
      {
        title: "Inventory Analytics & Reporting",
        desc: "Implemented data-driven dashboards for logistics efficiency.",
        image: "/Industry/KONGYUN.jpg",
      },
    ].map((item, idx) => {
      const isEven = idx % 2 === 0;
      return (
        <motion.div
          key={idx}
          className={`group relative flex flex-col md:flex-row items-center gap-8 cursor-pointer ${
            isEven ? "md:flex-row-reverse" : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          {/* 图片部分 */}
          <motion.div
            className="md:w-1/2 flex-shrink-0 overflow-hidden rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 md:h-80 object-cover transition-transform duration-500"
            />
          </motion.div>

          {/* 文本部分 */}
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="text-2xl sm:text-3xl font-semibold mb-4">
              {item.title}
            </h4>
            <p className="text-gray-700 text-lg leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</motion.section>


        {/* CTA 区 */}
        <motion.div
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Elevate Your Logistics?
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of logistics and warehouse leaders, and gain
            access to resources, knowledge, and best practices to stay ahead in
            a fast-evolving industry.
          </p>
          <a
            href="/Join"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}
