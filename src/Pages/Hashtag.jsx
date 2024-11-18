import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import Closeicon from "../assets/image/close-icon.svg";
import { useNavigate } from "react-router-dom";
import { serverApi } from "../config";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles
import { addHashTagByVideo } from '../redux/hashTagByVideoSlice';



const Hashtag = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch();
  
  const [selectedHashtags, setSelectedHashtags] = useState([]); // Stores selected hashtag names
  const [hashtags, setHashtags] = useState([]); // Stores all available hashtags

  // Handle selecting and deselecting hashtags
  const handleHashtagSelect = (hashtag) => {
    setSelectedHashtags((prevSelected) =>
      prevSelected.includes(hashtag)
        ? prevSelected.filter((tag) => tag !== hashtag)
        : [...prevSelected, hashtag]
    );
  };

  // Fetch hashtags on initial render
  useEffect(() => {
    getHashtags();
  }, []);

  // Fetch active hashtags from the backend
  const getHashtags = async () => {
    try {
      const response = await axios.get(`${serverApi}/get-hashtag-frontend`);
      const activeHashtags = response?.data?.data?.list?.filter(
        (tag) => tag.status === "Active"
      ) || [];
      setHashtags(activeHashtags);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch hashtags. Please try again."); // Show error toast
    }
  };

  // Handle "Continue" button click to send selected hashtags to the backend
  const handleAllHashtagSelect = async () => {
    try {
      const selectedHashtagIds = hashtags
        .filter((tag) => selectedHashtags.includes(tag.name))
        .map((tag) => tag._id);

      // Send the selected hashtags to the backend
      const response = await axios.post(
        `${serverApi}/get-video-by-hashtags`,
        { hashtagIds: selectedHashtagIds }
      );

      console.log("Backend response:", response.data);
      dispatch(addHashTagByVideo(response?.data));

      // After successful response, navigate to the video reels page
      navigate("/video-reels");  // Redirect to the video reels page (or wherever you want)
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message); // Show error toast if any error occurs
    }
  };

  return (
    <div>
      <div className="formheading language-header">
        <img
          onClick={() => navigate("/")}  // Navigate back to home or any other page
          className="close-icon"
          src={Closeicon}
          alt="Close icon"
        />
        <h3>Choose a hashtag</h3>
        <p>Select hashtags that describe your content</p>
      </div>

      <ul
        className="hashtag-option"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px",
          padding: "0",
        }}
      >
        {hashtags.map((tag) => (
          <li
            key={tag._id}
            onClick={() => handleHashtagSelect(tag.name)}
            style={{
              flex: "1 1 30%",
              minWidth: "150px",
              padding: "10px",
              textAlign: "center",
              backgroundColor: selectedHashtags.includes(tag.name)
                ? "#000"
                : "#ecf2f9",
              color: selectedHashtags.includes(tag.name) ? "#fff" : "#000",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            {tag.name}
          </li>
        ))}
      </ul>

      <div className="formBtn">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleAllHashtagSelect} // Trigger the backend call and navigation
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Hashtag;