import React, { useState, useEffect, useRef } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from "react-bootstrap";
import { serverApi } from "../config";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoPlayer from "../Components/VideoPlayer";

const Video = () => {
  const [videoList, setVideoList] = useState([]);
  const [mutedVideos, setMutedVideos] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    getHashtagVideo(true, currentPage); // Load videos when component mounts
  }, [currentPage]);

  // Fetch videos with pagination
  const getHashtagVideo = async (isMute, page = 1, limit = 2) => {
    try {
      const response = await axios.get(`${serverApi}/video-reels/${page}/${limit}`);
      if (response.data.status === 'success') {
        const videoList = response.data.data || [];
        setHasMore(videoList.length === limit); // Check if there are more videos to load
        setVideoList(prevVideos => [...prevVideos, ...videoList]); // Append new videos to existing ones

        // Set initial mute state for the videos
        if (isMute) {
          const mutedVideoIds = videoList.reduce((acc, item) => {
            acc[item._id] = true;
            return acc;
          }, {});
          setMutedVideos(mutedVideoIds);
        }
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Infinite scroll functionality
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMore) {
      setCurrentPage(prevPage => prevPage + 1); // Fetch the next page of videos
    }
  };

  // Toggle video mute/unmute
  const toggleMute = (videoId) => {
    setMutedVideos((prevState) => ({
      ...prevState,
      [videoId]: !prevState[videoId],
    }));
  };

  return (
    <div onScroll={handleScroll}>
      <ToastContainer closeButton={true} position="top-right" />
      <Container>
        <div className="slider-container">
          <Slider
            dots={false}
            arrows={false}
            infinite={false}
            vertical={true}
            verticalSwiping={true}
            slidesToShow={1}
            slidesToScroll={1}
            speed={500}
          >
            {videoList.map((item, i) => (
              <div key={i}>
                <div className="reels">
                  <VideoPlayer 
                    videoUrl={item.videoLink}
                    loaderFun={() => setLoading(false)} 
                    isMuted={mutedVideos[item._id]} 
                    activeIndex={true}
                  />
                  <button 
                    onClick={() => toggleMute(item._id)}
                    style={{position: 'absolute', top: '10px', left: '10px'}}
                  >
                    {mutedVideos[item._id] ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
};

export default Video;
