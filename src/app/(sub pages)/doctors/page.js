'use client';

export const dynamic = "force-dynamic";

import React from 'react';
import DoctorsList from '@/components/DoctorsList/DoctorsList';

export default function DoctorsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="w-full min-h-screen p-8">
        <DoctorsList />
      </div>
    </main>
  );
} 