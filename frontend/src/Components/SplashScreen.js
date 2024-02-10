import React, { useState } from 'react';

const SplashScreen = ({ handleChatPrompt }) => {
  var avatar_ss = "/images/avatar.png";
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);

  const handleLanguageSelect = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      setShowLanguageSelection(false);
      handleChatPrompt(selectedLanguage);
    }
  };

  return (
    <div className="splash-screen">
      {showLanguageSelection ? (
        <>
          <h1>Welcome</h1>
          <div className="language-selection">
            <h2>Select your language:</h2>
            <div className="avatarss-container-app">
              <img src={avatar_ss} alt="..." />
            </div>
            <label>
              <select value={selectedLanguage} onChange={handleLanguageSelect}>
                <option value="">Select a language</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
              </select>
            </label>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </>
      ) : (
        <>
          {/* <h1>Welcome to our Clothing Store!</h1>
          Additional content for the splash screen if needed */}
        </>
      )}
    </div>
  );
};

export default SplashScreen;
