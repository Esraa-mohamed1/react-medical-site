'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AuthForm from '@/components/AuthForm';
import '@/styles/auth.css';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="w-full min-h-screen p-8">
        <AuthForm />
      </div>
    </main>
  );
} 