'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DoctorsList from '@/components/DoctorsList/DoctorsList';
import '@/styles/DoctorsList.css';

export default function DoctorsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="w-full min-h-screen p-8">
        <DoctorsList />
      </div>
    </main>
  );
} 