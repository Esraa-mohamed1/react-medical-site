'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaLanguage } from 'react-icons/fa';

export default function DoctorInfo({ doctor }) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">About Doctor</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaGraduationCap className="text-blue-400" />
            Education
          </h3>
          <div className="space-y-3">
            {doctor.education.map((edu, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-white/70">{edu.institution}</p>
                <p className="text-white/50 text-sm">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaAward className="text-blue-400" />
            Certifications
          </h3>
          <div className="space-y-2">
            {doctor.certifications.map((cert, index) => (
              <div key={index} className="bg-white/5 p-3 rounded-lg">
                <p>{cert}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaLanguage className="text-blue-400" />
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {doctor.languages.map((lang, index) => (
              <span
                key={index}
                className="bg-white/10 px-3 py-1 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Experience</h3>
          <p className="text-white/80">
            {doctor.experience} years of experience in {doctor.specialty}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 