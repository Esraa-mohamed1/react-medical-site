'use client';

import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactInfo({ doctor }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <FaPhone className="text-blue-400 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-white/80">{doctor.clinic.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <FaEnvelope className="text-blue-400 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-white/80">{doctor.clinic.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-white/10 p-3 rounded-lg">
            <FaMapMarkerAlt className="text-blue-400 text-xl" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Address</h3>
            <p className="text-white/80">{doctor.clinic.address}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <h3 className="font-semibold mb-3">Next Available</h3>
          <p className="text-white/80">{doctor.nextAvailable}</p>
        </div>
      </div>
    </motion.div>
  );
} 