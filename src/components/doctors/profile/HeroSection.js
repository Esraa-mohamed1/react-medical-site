'use client';

import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

export default function HeroSection({ doctor }) {
  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm rounded-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-48 h-48 md:w-64 md:h-64"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="rounded-full w-full h-full object-cover border-4 border-white/20"
          />
          {doctor.available && (
            <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Available
            </div>
          )}
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {doctor.name}
          </motion.h1>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start items-center mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">
              {doctor.specialty}
            </span>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span>{doctor.rating}</span>
              <span className="text-white/70">({doctor.reviews} reviews)</span>
            </div>
          </motion.div>

          <motion.p 
            className="text-white/80 mb-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {doctor.bio}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <FaCalendarAlt />
              Book Appointment
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <FaPhoneAlt />
              Contact
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 