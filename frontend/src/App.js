import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SplashScreen from './Components/SplashScreen';
import ChatPrompt from './Components/ChatPrompt';
import ProductCarousel from './Components/ProductCarousel';
import './styles.css';

const App = () => {
  const avatar = "/images/avatar.png";
  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showType, setShowType] = useState(null);
  const [showColor, setShowColor] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imagePath, setImagePath] = useState(null);

  const handleChatPrompt = async (userInput) => {
    try {
      let newChatHistory;

      if (!selectedLanguage) {
        const defaultMessage = 'Hi, welcome to Trendy Threads how can I help you?';
        newChatHistory = [
          { role: 'bot', text: defaultMessage },
        ];
      } else {
        const response = await fetch('http://127.0.0.1:5000/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chatbot reply');
        }

        const { reply } = await response.json();
        const showType = reply.showType || null;
        const imagePath = reply.imagePath || null;
        newChatHistory = [
          ...chatHistory,
          { role: 'user', text: userInput },
          { role: 'bot', text: reply.text },
        ];
        console.log(reply)

        setShowType(showType);
        setImagePath(imagePath);
      }

      setChatHistory(newChatHistory);
      setShowChatPrompt(true);
      setSelectedLanguage(userInput);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div style={{ height: '100%' }}>
      {!showChatPrompt && (
        <SplashScreen handleChatPrompt={handleChatPrompt} />
      )}
      {showChatPrompt && (
        <>
          <Navbar />
          <ChatPrompt
            chatHistory={chatHistory}
            handleChatPrompt={handleChatPrompt}
            selectedLanguage={selectedLanguage}
            showType={showType}
          />
          <div className="avatar-container">
            <img src={avatar} alt="..." />
          </div>
          <div>
            {imagePath && (
              <ProductCarousel imagePath={imagePath} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
