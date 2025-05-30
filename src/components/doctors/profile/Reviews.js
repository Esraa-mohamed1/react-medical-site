'use client';

import { motion } from 'framer-motion';
import { FaStar, FaUserCircle } from 'react-icons/fa';

export default function Reviews({ reviews }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Patient Reviews</h2>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            className="border-b border-white/10 pb-6 last:border-0 last:pb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-full">
                <FaUserCircle className="text-blue-400 text-2xl" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{review.patientName}</h3>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-white/80 mb-2">{review.comment}</p>
                <p className="text-sm text-white/60">{review.date}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 