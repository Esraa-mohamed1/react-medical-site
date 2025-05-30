'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaList, FaMap } from 'react-icons/fa';

export default function SearchControls({ onSearch, onViewChange, currentView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, location });
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, specialty, or condition"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          </div>

          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Search
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onViewChange('list')}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              <FaList />
            </button>
            <button
              type="button"
              onClick={() => onViewChange('map')}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              <FaMap />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
} 