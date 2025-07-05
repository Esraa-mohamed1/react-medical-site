# AI Chat Interface for Mental Health Support

## Overview

This implementation provides a modern, friendly chat interface for a mental health AI assistant that can be accessed from the home page. The chat interface is designed with calming colors and user-friendly features to provide a supportive environment for users seeking mental health guidance.

## Features

### 🎨 **Modern UI Design**
- Calming gradient colors (purple/blue theme)
- Smooth animations and transitions
- Responsive design for mobile and desktop
- Accessibility features (reduced motion support)

### 💬 **Chat Functionality**
- Real-time conversation with AI assistant
- Message history maintained in frontend
- Loading indicators with typing animation
- Clear chat and start new session options
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)

### 🔧 **Technical Features**
- RESTful API integration with backend
- Error handling and fallback responses
- Service layer for clean code organization
- Auto-scroll to latest messages
- Session management

## API Integration

### Endpoint
```
POST /api/medical/ai-chat/chat/
```

### Request Body
```json
{
  "question": "I feel stressed, what should I do?",
  "session_topic": "mental_health"
}
```

### Response Format
```json
{
  "response": "I understand you're feeling stressed. Here are some techniques that might help...",
  "message": "Alternative response field",
  "answer": "Another possible response field"
}
```

## Usage

### For Users
1. Navigate to the home page
2. Click the "AI Support" button in the bottom-right corner
3. Type your mental health questions or concerns
4. Press Enter or click the send button
5. Receive supportive responses from the AI assistant

### For Developers

#### Adding to Other Pages
```jsx
import AIChatInterface from '../components/AIChatInterface';

function YourPage() {
  return (
    <div>
      {/* Your page content */}
      <AIChatInterface />
    </div>
  );
}
```

#### Customizing the Service
```javascript
import { aiChatService } from '../services/aiChatService';

// Send a message
const result = await aiChatService.sendMessage("How are you feeling today?");

// Start a new session
const session = await aiChatService.startNewSession("anxiety");

// Get conversation history
const history = await aiChatService.getConversationHistory(sessionId);
```

## File Structure

```
src/
├── components/
│   ├── AIChatInterface.js          # Main chat component
│   └── AIChatInterface.css         # Styling for chat interface
├── services/
│   └── aiChatService.js            # API service functions
└── features/homePage/
    └── homePage.jsx                # Home page with chat integration
```

## Styling

The chat interface uses a calming color palette:
- **Primary Gradient**: `#667eea` to `#764ba2` (purple/blue)
- **Background**: `#f8fafc` (light gray)
- **Text**: `#333` (dark gray)
- **Accents**: `#e1e5e9` (light borders)

## Error Handling

The interface gracefully handles:
- Network connectivity issues
- API endpoint failures
- Invalid responses
- Loading timeouts

Users receive friendly error messages that encourage them to try again or seek professional help if needed.

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- Reduced motion support for users with vestibular disorders
- High contrast color scheme
- Clear focus indicators

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- [ ] Persistent chat history across sessions
- [ ] File/image sharing capabilities
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Integration with user authentication
- [ ] Chat export functionality
- [ ] Customizable themes
- [ ] Offline mode with cached responses

## Troubleshooting

### Common Issues

1. **Chat not opening**: Check if the component is properly imported and rendered
2. **API errors**: Verify the backend endpoint is running at `http://localhost:8000`
3. **Styling issues**: Ensure the CSS file is properly imported
4. **Mobile responsiveness**: Test on different screen sizes

### Debug Mode

Enable console logging by adding this to the component:
```javascript
const DEBUG = true;
// Add console.log statements for debugging
```

## Contributing

When contributing to the AI chat interface:

1. Follow the existing code style and patterns
2. Test on multiple devices and browsers
3. Ensure accessibility standards are maintained
4. Update this documentation for any new features
5. Add appropriate error handling for new functionality 