import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import ShareGirl from "../assets/image/shareGirl.gif";
import TruthShine from "../assets/image/truthShine.mp4";
import Videoftr from "../assets/image/video-ftr-img.png";
import Videoftr1 from "../assets/image/video-ftr-img-1.svg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VideoReels = () => {
  const [rangeValues, setRangeValues] = useState({
    range1: 5, // Initial value of first slider
    range2: 74, // Initial value of second slider
  });

  // Function to handle slider value changes
  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setRangeValues((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  };

  // Function to calculate the background size for track styles
  const getTrackStyle = (value, min = 0, max = 100) => {
    const perc = max ? Math.round((100 * (value - min)) / (max - min)) : value;
    return {
      backgroundSize: `${perc}% 100%`,
    };
  };
  const navigate = useNavigate();

  const goToAboutPage = () => {
    navigate("/video-detail"); // Navigate to the About page
  };

  return (
    <>
      <section className='video-reels'>
        <div className='video-scroll'>
          <video
            className='videoreal'
            autoPlay
            muted
            loop
          >
            <source
              src={TruthShine}
              type='video/mp4'
            />
          </video>
          <div className='detail-video'>
            <div className='box'>
              <input
                type='range'
                name='range1'
                value={rangeValues.range1}
                onChange={handleRangeChange}
                style={getTrackStyle(rangeValues.range1)}
                data-idx='1'
              />
              {/* Second range slider with tip */}
            </div>
            <h3 onClick={goToAboutPage}>Lorem Ipsum</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              ind<span>...more</span>
            </p>
          </div>
        </div>
        <div className='video-scroll'>
          <video
            className='videoreal'
            autoPlay
            muted
            loop
          >
            <source
              src={TruthShine}
              type='video/mp4'
            />
          </video>
          <div className='detail-video'>
            <div className='box'>
              <input
                type='range'
                name='range1'
                value={rangeValues.range1}
                onChange={handleRangeChange}
                style={getTrackStyle(rangeValues.range1)}
                data-idx='1'
              />
              {/* Second range slider with tip */}
            </div>
            <h3>Lorem Ipsum</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              ind<span>...more</span>
            </p>
          </div>
        </div>
      </section>
      <section className='video-ftr'>
        <img
          src={Videoftr}
          alt=''
        />
        <img
          src={Videoftr1}
          alt=''
        />
      </section>
    </>
  );
};

export default VideoReels;
