import React, { useEffect, useState } from "react";
import Closeicon from "../assets/image/close-icon.svg";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../config";
import axios from "axios";

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [language, setLanguage] = useState([]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    console.log("Selected language:", language);
  };

  useEffect(() => {
    getLanguage();
  }, []);

  const getLanguage = async () => {
    try {
      const response = await axios.get(`${serverApi}/language/get`);
      const activeLanguages =
        response?.data?.data?.filter((lang) => lang.status === "Active") || [];
      setLanguage(activeLanguages);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="formheading language-header">
        <img
          onClick={() => navigate("/")}
          className="close-icon"
          src={Closeicon}
          alt="Close icon"
        />
        <h3>Choose the language</h3>
        <p>You are comfortable speaking</p>
      </div>

      <ul className="language-option">
  {language.map((lang) => (
    <li key={lang._id}>
      <input
        type="radio"
        name="language"
        checked={selectedLanguage === lang.name}
        onChange={() => handleLanguageSelect(lang.name)}
      />
      <span>{lang.name}</span>
    </li>
  ))}
</ul>

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
