import React, { useState } from 'react';
import Closeicon from '../assets/image/close-icon.svg';
import { useNavigate } from 'react-router-dom';

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English"); // State to store selected language

  // Function to set language and log it to console when "Continue" is clicked
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    console.log("Selected language:", language);
  };

  return (
    <div>
      {/* Header with close icon and text */}
      <div className='formheading language-header'>
        <img onClick={() => navigate('/')} className='close-icon' src={Closeicon} alt="Close icon" />
        <h3>Choose the language</h3>
        <p>You are comfortable speaking</p>
      </div>

      {/* Language options as hardcoded list items */}
      <ul className='language-option'>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "English"}
            onChange={() => handleLanguageSelect("English")}
          />
          <span>English</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Tamil"}
            onChange={() => handleLanguageSelect("Tamil")}
          />
          <span>Tamil</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Hindi"}
            onChange={() => handleLanguageSelect("Hindi")}
          />
          <span>Hindi</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Telugu"}
            onChange={() => handleLanguageSelect("Telugu")}
          />
          <span>Telugu</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Spanish"}
            onChange={() => handleLanguageSelect("Spanish")}
          />
          <span>Spanish</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Russian"}
            onChange={() => handleLanguageSelect("Russian")}
          />
          <span>Russian</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Italian"}
            onChange={() => handleLanguageSelect("Italian")}
          />
          <span>Italian</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Korean"}
            onChange={() => handleLanguageSelect("Korean")}
          />
          <span>Korean</span>
        </li>
        <li>
          <input
            type="radio"
            name="language"
            checked={selectedLanguage === "Bengali"}
            onChange={() => handleLanguageSelect("Bengali")}
          />
          <span>Bengali</span>
        </li>
      </ul>

      {/* Button to confirm and log selected language */}
      <div className="formBtn">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => navigate("/")}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Language;
