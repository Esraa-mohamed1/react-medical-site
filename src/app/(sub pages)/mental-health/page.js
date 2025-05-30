'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import BreathingExercise from '@/components/articalComponents/BreathingExercise';
import CopingStrategies from '@/components/articalComponents/CopingStrategies';
import MoodTracker from '@/components/articalComponents/MoodTracker';
import ProfessionalHelp from '@/components/articalComponents/ProfessionalHelp';
import '@/styles/MentalHealthArticle.css';

const resources = [
  {
    id: 1,
    title: "Crisis Support",
    description: "Immediate help and support for mental health crises.",
    image: "/images/resource-placeholder.jpg",
    links: [
      {
        text: "24/7 Crisis Hotline",
        url: "tel:1-800-273-8255",
      },
      {
        text: "Emergency Services",
        url: "/emergency",
      },
    ],
  },
  {
    id: 2,
    title: "Self-Help Resources",
    description: "Tools and guides for managing mental health.",
    image: "/images/resource-placeholder.jpg",
    links: [
      {
        text: "Meditation Guides",
        url: "/meditation",
      },
      {
        text: "Stress Management",
        url: "/stress-management",
      },
    ],
  },
  {
    id: 3,
    title: "Support Groups",
    description: "Connect with others in similar situations.",
    image: "/images/resource-placeholder.jpg",
    links: [
      {
        text: "Find Local Groups",
        url: "/groups",
      },
      {
        text: "Online Communities",
        url: "/online-communities",
      },
    ],
  },
  {
    id: 4,
    title: "Professional Help",
    description: "Find qualified mental health professionals.",
    image: "/images/resource-placeholder.jpg",
    links: [
      {
        text: "Find a Therapist",
        url: "/therapists",
      },
      {
        text: "Treatment Options",
        url: "/treatment",
      },
    ],
  },
];

export default function MentalHealthPage() {
  const [activeTab, setActiveTab] = useState('breathing');

  const tabs = [
    { id: 'breathing', label: 'Breathing Exercise' },
    { id: 'coping', label: 'Coping Strategies' },
    { id: 'mood', label: 'Mood Tracker' },
    { id: 'help', label: 'Professional Help' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Mental Health Support</h1>

          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 'breathing' && <BreathingExercise />}
            {activeTab === 'coping' && <CopingStrategies />}
            {activeTab === 'mood' && <MoodTracker />}
            {activeTab === 'help' && <ProfessionalHelp />}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 