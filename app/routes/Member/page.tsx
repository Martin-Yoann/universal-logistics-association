"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function BecomeMemberPage() {
  return (
    <div className="container mx-auto px-4 py-16 pt-50">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Become a Member
      </motion.h1>

      <motion.section
        className="max-w-4xl mx-auto mb-16"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Membership Overview</h2>
        <p className="text-lg text-gray-700 mb-4">
          Membership in ULA is selective and designed for organizations that meet the association’s standards of professionalism,
          operational integrity, and commitment to industry advancement. Companies may be invited to join or may apply for consideration.
        </p>
        <p className="text-lg text-gray-700">
          All applications undergo a structured evaluation, and only approved organizations receive a formal invitation from the Board.
        </p>
      </motion.section>

      <motion.section
        className="max-w-4xl mx-auto mb-16"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">What Members Gain</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
          <li>A highly curated network of industry leaders</li>
          <li>Exclusive insights and knowledge not distributed publicly</li>
          <li>Strategic collaboration opportunities through roundtables and workshops</li>
          <li>Operational and regulatory support across logistics and warehouse operations</li>
          <li>Influence on industry standards and initiatives shaping the future of logistics</li>
        </ul>
      </motion.section>

      <motion.section
        className="max-w-4xl mx-auto mb-16"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Membership Pathway</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-lg">
          <li>Invitation or Application Submission</li>
          <li>Evaluation and Board Review</li>
          <li>Formal Invitation to Join</li>
          <li>Onboarding and Access to Member Resources</li>
        </ol>
      </motion.section>

      <motion.div
        className="text-center"
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all duration-300"
        >
          Apply for Membership
        </Link>
      </motion.div>
    </div>
  );
}
