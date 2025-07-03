import React, { useState, useRef, useEffect } from 'react';
import { aiChatService } from '../services/aiChatService';
import './AIChatInterface.css';
import Footer from "./../features/homePage/components/Footer";
import CustomNavbar from './../components/Navbar';
import { useNavigate } from 'react-router-dom';


const AIChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm here to support you with your mental health. How are you feeling today? Feel free to share anything that's on your mind.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const result = await aiChatService.sendMessage(userMessage.content);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: result.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or consider reaching out to a mental health professional for immediate support.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'ai',
        content: "Hello! I'm here to support you with your mental health. How are you feeling today? Feel free to share anything that's on your mind.",
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    return timestamp.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
    <CustomNavbar />
    <div className="ai-chat-room">
      {/* Chat Room Header */}
      <div className="chat-room-header">
        <div className="header-content">
          <div className="ai-avatar-large">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="header-actions">
            <button onClick={clearChat} className="clear-chat-btn" title="Clear chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
              </svg>
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="chat-messages-area">
          <div className="messages-container">
            {messages.map((message, index) => {
              const showDate = index === 0 || 
                new Date(message.timestamp).toDateString() !== 
                new Date(messages[index - 1].timestamp).toDateString();
              
              return (
                <React.Fragment key={message.id}>
                  {showDate && (
                    <div className="date-separator">
                      <span>{formatDate(message.timestamp)}</span>
                    </div>
                  )}
                  <div className={`message ${message.type}`}>
                    <div className="message-content">
                      <div className="message-text">{message.content}</div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                    </div>
                    {message.type === 'ai' && (
                      <div className="message-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            {isLoading && (
              <div className="message ai">
                <div className="message-content">
                  <div className="loading-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="typing-text">AI is thinking...</span>
                  </div>
                </div>
                <div className="message-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9ZM19 9H14V4H5V21H19V9Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input Area */}
        <div className="chat-input-area">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts, feelings, or ask for support..."
              disabled={isLoading}
              rows="1"
            />
            <button 
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="send-btn"
              title="Send message"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="input-hint">
            Press Enter to send, Shift+Enter for new line • Your conversations are private and secure
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AIChatInterface; 