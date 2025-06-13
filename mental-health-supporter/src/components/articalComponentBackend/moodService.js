// This would be actual API calls in a real app
const moodService = {
    getMoodData: async (userId) => {
      // In a real app, this would fetch from your backend
      return mockMoodData[userId] || [];
    },
  
    saveMoodEntry: async (userId, moodEntry) => {
      // In a real app, this would POST to your backend
      console.log('Saving mood entry:', moodEntry);
      return { success: true };
    }
  };
  
  // Mock data - in a real app this would come from your backend
  const mockMoodData = {
    'user1': [
      { day: 'Mon', mood: 60, emoji: '😐' },
      { day: 'Tue', mood: 45, emoji: '🙂' },
      // ... more data
    ],
    // ... more users
  };
  
  export default moodService;