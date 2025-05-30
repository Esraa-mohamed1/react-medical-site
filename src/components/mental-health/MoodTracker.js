'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSmile, FaMeh, FaFrown, FaChartLine } from 'react-icons/fa';

const moods = [
  { id: 'happy', icon: FaSmile, label: 'Happy', color: 'text-yellow-400' },
  { id: 'neutral', icon: FaMeh, label: 'Neutral', color: 'text-blue-400' },
  { id: 'sad', icon: FaFrown, label: 'Sad', color: 'text-purple-400' }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [note, setNote] = useState('');

  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood) {
      const newEntry = {
        id: Date.now(),
        mood: selectedMood,
        note,
        timestamp: new Date().toISOString()
      };
      setMoodHistory([newEntry, ...moodHistory]);
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-6">Mood Tracker</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">How are you feeling today?</h3>
          <div className="flex justify-center gap-8">
            {moods.map(({ id, icon: Icon, label, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleMoodSelect(id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                  selectedMood === id ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                <Icon className={`text-4xl ${color}`} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Add a note (optional)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
            placeholder="How was your day? What's on your mind?"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedMood}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-white/20 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Save Entry
        </button>
      </form>

      {moodHistory.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaChartLine />
            Mood History
          </h3>
          <div className="space-y-4">
            {moodHistory.map((entry) => {
              const { icon: Icon, color } = moods.find((m) => m.id === entry.mood);
              return (
                <motion.div
                  key={entry.id}
                  className="bg-white/5 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`text-2xl ${color}`} />
                    <span className="font-medium">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-white/80 text-sm">{entry.note}</p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
} 