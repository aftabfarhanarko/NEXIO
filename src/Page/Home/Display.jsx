import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Globe,
  PlayCircle,
  Smartphone,
  Mail,
  BarChart3,
  Cloud,
  MessageCircle,
  MapPin,
  ShoppingCart,
  Wifi,
} from "lucide-react";
import dashboardImg from "../../assets/demo-app (1).webp";

const Display = () => {
  // Orbiting icons data
  const orbitingIcons = [
    {
      Icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-100",
      delay: 0,
      x: -140,
      y: -100,
    },
    {
      Icon: Wifi,
      color: "text-red-500",
      bg: "bg-red-100",
      delay: 1,
      x: 140,
      y: -100,
    },
    {
      Icon: BarChart3,
      color: "text-green-500",
      bg: "bg-green-100",
      delay: 2,
      x: 0,
      y: -160,
    },
    {
      Icon: MessageCircle,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
      delay: 3,
      x: -140,
      y: 100,
    },
    {
      Icon: Cloud,
      color: "text-purple-500",
      bg: "bg-purple-100",
      delay: 4,
      x: 140,
      y: 100,
    },
    {
      Icon: ShoppingCart,
      color: "text-orange-500",
      bg: "bg-orange-100",
      delay: 5,
      x: 0,
      y: 160,
    },
  ];

  return (
    <div className="relative min-h-screen -mt-10 flex items-center bg-base-100 overflow-hidden  pb-20">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1250px] mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center z-10">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8"
          >
            <Smartphone size={16} /> WELCOME TO NEXIO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold text-base-content leading-tight mb-6"
          >
            Connect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Digital World
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-base-content/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Experience the ultimate ecosystem where all your tools,
            communication, and data converge. Simplify your life with our
            all-in-one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
          >
            <button className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20">
              Start Exploring <Zap size={20} className="ml-2" />
            </button>
            <button className="btn btn-outline btn-lg rounded-full px-8">
              Our Services
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center lg:justify-start gap-12 border-t border-base-200 pt-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-base-content">500+</h3>
              <p className="text-base-content/50 text-sm">Integrations</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-base-content">24/7</h3>
              <p className="text-base-content/50 text-sm">Expert Support</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-base-content">100%</h3>
              <p className="text-base-content/50 text-sm">Secure</p>
            </div>
          </motion.div>
        </div>

        {/* Right Visual - Orbit System */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center h-[500px] lg:h-[600px]"
        >
          {/* Orbit Rings */}
          <div
            className="absolute border border-dashed border-base-content/10 rounded-full w-[300px] h-[300px] animate-spin-slow"
            style={{ animationDuration: "30s" }}
          />
          <div
            className="absolute border border-dashed border-base-content/10 rounded-full w-[450px] h-[450px] animate-spin-reverse-slow"
            style={{ animationDuration: "40s" }}
          />

          {/* Central Phone/Hub */}
          <div className="relative z-20 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center p-2 ring-8 ring-base-100">
            <div className="w-full h-full rounded-full overflow-hidden bg-base-200 relative">
              <img
                src={dashboardImg}
                alt="Central Hub"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                <div className="bg-white/90 p-3 rounded-2xl shadow-lg">
                  <Smartphone size={32} className="text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Orbit Cards */}
          {orbitingIcons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`absolute flex flex-col items-center justify-center w-16 h-16 rounded-2xl shadow-lg ${item.bg} border border-white/50 backdrop-blur-sm z-30 cursor-pointer hover:scale-110 transition-transform`}
              style={{
                transform: `translate(${item.x}px, ${item.y}px)`,
                // We apply the translation here as a static position relative to center
              }}
            >
              <item.Icon size={24} className={item.color} />
            </motion.div>
          ))}

          {/* Floating Labels (optional decoration) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-10 right-10 bg-white px-4 py-2 rounded-xl shadow-lg border border-base-200 text-sm font-bold text-base-content hidden md:block"
          >
            ✨ AI Powered
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 bg-white px-4 py-2 rounded-xl shadow-lg border border-base-200 text-sm font-bold text-base-content hidden md:block"
          >
            🚀 Fast Sync
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Display;
