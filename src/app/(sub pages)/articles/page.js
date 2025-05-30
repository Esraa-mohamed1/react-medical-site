'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MentalHealthArticle from '@/components/articalComponentBackend/MentalHealthArticle';
import '@/styles/article.css';

export default function ArticlesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <div className="w-full min-h-screen p-8">
        <MentalHealthArticle />
      </div>
    </main>
  );
} 