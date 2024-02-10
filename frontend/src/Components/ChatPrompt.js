import React, { useState } from 'react';

const ChatPrompt = ({ chatHistory, handleChatPrompt }) => {
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = () => {
    if (userInput.trim() !== '') {
      handleChatPrompt(userInput);
      setUserInput('');
    }
  };

  return (
    <div style={{ height: '100%' }}>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleChange}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPrompt;
