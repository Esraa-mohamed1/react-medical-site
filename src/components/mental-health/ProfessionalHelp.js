'use client';

import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';

const resources = [
  {
    id: 1,
    name: 'National Crisis Hotline',
    description: '24/7 support for mental health crises',
    phone: '1-800-273-8255',
    website: 'https://www.crisistextline.org',
    type: 'Emergency'
  },
  {
    id: 2,
    name: 'SAMHSA Helpline',
    description: 'Treatment referral and information service',
    phone: '1-800-662-4357',
    website: 'https://www.samhsa.gov',
    type: 'Information'
  },
  {
    id: 3,
    name: 'Psychology Today',
    description: 'Find therapists and mental health professionals',
    website: 'https://www.psychologytoday.com',
    type: 'Directory'
  },
  {
    id: 4,
    name: 'BetterHelp',
    description: 'Online therapy and counseling',
    website: 'https://www.betterhelp.com',
    type: 'Online Therapy'
  }
];

export default function ProfessionalHelp() {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Professional Help Resources</h2>

      <div className="space-y-6">
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            className="bg-white/5 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{resource.name}</h3>
                <p className="text-white/70 text-sm">{resource.description}</p>
              </div>
              <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">
                {resource.type}
              </span>
            </div>

            <div className="space-y-3">
              {resource.phone && (
                <a
                  href={`tel:${resource.phone}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <FaPhone className="text-blue-400" />
                  <span>{resource.phone}</span>
                </a>
              )}
              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <FaGlobe className="text-blue-400" />
                <span>{resource.website}</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-yellow-500/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Emergency Support</h3>
        <p className="text-white/80">
          If you're experiencing a mental health emergency, please call 911 or go to your nearest emergency room immediately.
        </p>
      </div>
    </motion.div>
  );
} 