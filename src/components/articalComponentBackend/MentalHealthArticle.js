'use client';

import React, { useState, useEffect } from 'react';
import TriggerList from './TriggerList';
import MoodTracker from './MoodTracker';
import BreathingExercise from '@/components/mental-health/BreathingExercise';
import './MentalHealthArticle.css';

const MentalHealthArticle = ({ clientData = {} }) => {
  const [currentSection, setCurrentSection] = useState('overview');
  
  // This would come from backend in a real app
  const initialMoodData = [
    { day: 'Mon', mood: 60, emoji: '😐' },
    { day: 'Tue', mood: 45, emoji: '🙂' },
    { day: 'Wed', mood: 70, emoji: '😠' },
    { day: 'Thu', mood: 30, emoji: '😊' },
    { day: 'Fri', mood: 55, emoji: '😐' },
    { day: 'Sat', mood: 40, emoji: '🙂' },
    { day: 'Sun', mood: 65, emoji: '😤' }
  ];

  const triggers = [
    { id: 1, name: 'Work stress', checked: false },
    { id: 2, name: 'Social situations', checked: false },
    { id: 3, name: 'Family issues', checked: false },
    { id: 4, name: 'Financial concerns', checked: false },
    { id: 5, name: 'Health worries', checked: false }
  ];

  const handleMoodSelected = (mood) => {
    // This would send data to backend in a real app
    console.log('Selected mood:', mood);
  };

  return (
    <div className="article-container">
      <div className="article-header">
        <h1>Understanding and Managing Mental Health</h1>
        <p className="article-meta">Last updated: May 2024</p>
      </div>

      <div className="article-navigation">
        <button 
          className={currentSection === 'overview' ? 'active' : ''} 
          onClick={() => setCurrentSection('overview')}
        >
          Overview
        </button>
        <button 
          className={currentSection === 'breathing' ? 'active' : ''} 
          onClick={() => setCurrentSection('breathing')}
        >
          Breathing Exercise
        </button>
        <button 
          className={currentSection === 'triggers' ? 'active' : ''} 
          onClick={() => setCurrentSection('triggers')}
        >
          Triggers
        </button>
        <button 
          className={currentSection === 'mood' ? 'active' : ''} 
          onClick={() => setCurrentSection('mood')}
        >
          Mood Tracker
        </button>
      </div>

      <div className="article-content">
        {currentSection === 'overview' && (
          <div className="article-section">
            <h2>Understanding Mental Health</h2>
            <p>
              Mental health is an essential part of our overall well-being. It affects how we think,
              feel, and act. Good mental health helps us handle stress, relate to others, and make
              choices.
            </p>
            <p>
              This guide provides tools and techniques to help you manage your mental health,
              including breathing exercises, trigger identification, and mood tracking.
            </p>
          </div>
        )}

        {currentSection === 'breathing' && (
          <div className="article-section">
            <h2>Breathing Exercise</h2>
            <p>
              Deep breathing exercises can help reduce stress and anxiety. Try this guided breathing
              exercise to help you relax and center yourself.
            </p>
            <BreathingExercise />
          </div>
        )}

        {currentSection === 'triggers' && (
          <div className="article-section">
            <h2>Identifying Triggers</h2>
            <p>
              Understanding what triggers your stress or anxiety is the first step in managing it.
              Track your triggers to better understand patterns and develop coping strategies.
            </p>
            <div className="metric">
              <h4>Common Triggers</h4>
              <TriggerList triggers={triggers} />
            </div>
          </div>
        )}

        {currentSection === 'mood' && (
          <div className="article-section">
            <h2>Mood Tracking</h2>
            <p>
              Tracking your mood can help you identify patterns and understand what affects your
              mental well-being. Use this tool to record your daily mood and any significant events.
            </p>
            <MoodTracker 
              initialMoodData={initialMoodData} 
              onMoodSelected={handleMoodSelected}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthArticle;