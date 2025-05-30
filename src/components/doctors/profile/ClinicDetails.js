'use client';

import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ClinicDetails({ clinic }) {
  const days = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Clinic Information</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-400" />
            Location
          </h3>
          <p className="text-white/80">{clinic.address}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaClock className="text-blue-400" />
            Working Hours
          </h3>
          <div className="space-y-2">
            {days.map((day) => (
              <div key={day} className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                <span className="capitalize">{day}</span>
                <span className={clinic.workingHours[day] === 'Closed' ? 'text-red-400' : 'text-white/80'}>
                  {clinic.workingHours[day]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaPhone className="text-blue-400" />
            Contact
          </h3>
          <div className="space-y-3">
            <p className="text-white/80">{clinic.phone}</p>
            <p className="text-white/80">{clinic.email}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 