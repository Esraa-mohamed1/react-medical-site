const API_BASE_URL = 'https://pearla.pythonanywhere.com';

export const aiChatService = {
  /**
   * Send a message to the AI chat endpoint
   * @param {string} question - The user's question or message
   * @param {string} sessionTopic - The session topic (default: "mental_health")
   * @returns {Promise<Object>} - The AI response
   */
  async sendMessage(question, sessionTopic = "mental_health") {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medical/ai-chat/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question,
          session_topic: sessionTopic
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data,
        response: data.response || data.message || data.answer || "I'm here to help. Could you please tell me more about how you're feeling?"
      };
    } catch (error) {
      console.error('AI Chat API Error:', error);
      return {
        success: false,
        error: error.message,
        response: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or consider reaching out to a mental health professional for immediate support."
      };
    }
  },

  /**
   * Get conversation history (if implemented in backend)
   * @param {string} sessionId - The session ID
   * @returns {Promise<Array>} - Array of previous messages
   */
  async getConversationHistory(sessionId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medical/ai-chat/history/${sessionId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Get Conversation History Error:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  },

  /**
   * Start a new chat session (if implemented in backend)
   * @param {string} topic - The session topic
   * @returns {Promise<Object>} - Session information
   */
  async startNewSession(topic = "mental_health") {
    try {
      const response = await fetch(`${API_BASE_URL}/api/medical/ai-chat/session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('Start New Session Error:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }
};

export default aiChatService; 