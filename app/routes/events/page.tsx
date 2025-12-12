"use client";

import { motion } from "framer-motion";

export default function EventsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const upcomingEvents = [
    {
      title: "Logistics Leadership Roundtable",
      date: "Jan 15, 2026",
      location: "New York, USA",
      desc: "Exclusive roundtable for top logistics executives to discuss strategic challenges and solutions.",
    },
    {
      title: "ULA Annual Summit",
      date: "Mar 22-24, 2026",
      location: "Amsterdam, Netherlands",
      desc: "Global summit bringing together warehouse operators, supply chain innovators, and technology providers.",
    },
    {
      title: "Webinar Series: Modernizing Supply Chain Networks",
      date: "Monthly - Starts Feb 10, 2026",
      location: "Online",
      desc: "Interactive webinars on emerging technologies, AI, automation, and best practices in logistics.",
    },
  ];

  const additionalModules = [
    {
      title: "Global Logistics Workshops",
      desc: "Hands-on workshops focusing on port management, customs optimization, and international shipping compliance.",
    },
    {
      title: "Innovation Lab Tours",
      desc: "Exclusive visits to member facilities showcasing cutting-edge automation, robotics, and smart warehouse solutions.",
    },
    {
      title: "Regional Networking Meetups",
      desc: "Local events connecting regional operators, 3PL providers, and supply chain partners to foster collaboration.",
    },
    {
      title: "Supply Chain Certification Programs",
      desc: "Professional development programs to elevate skills in warehouse management, logistics strategy, and operational excellence.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-20 space-y-20 pt-50">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        Upcoming Member Events
      </motion.h1>
      

      {/* 即将活动 */}
      <div className="space-y-12">
        {upcomingEvents.map((event, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-xl bg-gray-50 shadow hover:shadow-lg transition duration-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="md:w-1/4">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                {event.title}
              </h3>
              <p className="text-gray-600">{event.date}</p>
              <p className="text-gray-600">{event.location}</p>
            </div>
            <p className="md:w-3/4 text-gray-700">{event.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 其他模块 */}
      <div className="space-y-16">
        {additionalModules.map((module, idx) => (
          <motion.section
            key={idx}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {module.title}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              {module.desc}
            </p>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
