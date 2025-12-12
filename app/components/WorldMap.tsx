"use client";
import { motion } from "framer-motion";

export default function WorldMap() {
  return (
    <div className="w-full bg-gray-900 text-gray-200 py-20 mt-20 rounded-3xl relative overflow-hidden">

      {/* 光晕背景 */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -top-20 -left-20"></div>
        <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] bottom-0 right-0"></div>
      </div>

      <div className="relative container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        
        {/* 左侧地图 */}
        <div className="relative w-full lg:w-2/3">
          {/* 世界地图 SVG */}
          <img
            src="/world-map.svg"
            alt="World Map"
            className="w-full opacity-80"
          />

          {/* 美国 Texas 位置点 */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute"
            style={{
              top: "45%",  // 调整地图上点的位置
              left: "28%",
            }}
          >
            <div className="relative">
              {/* 外圈脉冲 */}
              <span className="absolute inline-flex h-6 w-6 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
              {/* 实心点 */}
              <span className="relative inline-flex h-6 w-6 rounded-full bg-blue-600 shadow-lg"></span>
            </div>
          </motion.div>
        </div>

        {/* 右侧地址 + 说明 */}
        <div className="lg:w-1/3 space-y-5">
          <h2 className="text-3xl font-bold tracking-tight">
            Global Headquarters
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our primary headquarters and operational coordination center is 
            located in Texas, enabling direct access to major distribution 
            corridors, strategic logistics hubs and global freight routes.
          </p>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl border border-white/20 shadow-lg">
            <h3 className="font-bold text-xl mb-2 text-blue-400">Address</h3>
            <p className="text-gray-200">
              1101 E Arapaho Rd,<br />
              #2422,<br />
              Richardson, TX 75081
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
