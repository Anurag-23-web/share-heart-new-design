import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { serverApi } from "../config";
import { json, Link } from "react-router-dom";
import Videoftr from "../assets/image/video-ftr-img.png";
import Videoftr1 from "../assets/image/video-ftr-img-1.svg";
import { useSelector } from "react-redux";
import Header from "../Components/Header";

const VideoReels = () => {
  const [allVideo, setAllVideo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedVideo, setExpandedVideo] = useState(null);

  const [activeVideoIndex, setActiveVideoIndex] = useState(0); // Start with first video
  const videoRefs = useRef({});


  const getHashtagsByIdVideo = useSelector(
    (state) => state?.hashTagByVideo?.data
  );

  // Fetch videos on scroll or pagination
  const getAllVideos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      if (getHashtagsByIdVideo.length > 0) {
        setAllVideo(getHashtagsByIdVideo);
      } else {
        const response = await axios.get(
          `${serverApi}/video-reels/${currentPage}/${limit}`
        );
        
        const newVideos = response.data.data;
        console.log(newVideos);

        if (newVideos.length < limit) {
          setHasMore(false);
        }

        setAllVideo((prev) => [...prev, ...newVideos]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Play the video, pause all other videos
  const playVideo = async (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    try {
      video.muted = true;
      video.currentTime = 0; // Reset the time to 0:00 before playing
      await video.play();
      setTimeout(() => (video.muted = false), 100); // Unmute after play
      setActiveVideoIndex(index);

      // Pause all other videos except the current one
      Object.entries(videoRefs.current).forEach(([idx, videoEl]) => {
        if (videoEl && parseInt(idx) !== index) {
          videoEl.pause();
          videoEl.muted = true; // Ensure they stay muted
        }
      });
    } catch (error) {
      console.log("Video playback failed:", error);
    }
  };

  // Pause the video
  const pauseVideo = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.muted = true;
    }
  };

  // Handle navigation between videos
  const handleNextVideo = () => {
    if (activeVideoIndex < allVideo.length - 1) {
      setActiveVideoIndex((prevIndex) => prevIndex + 1);
  
      // Check if we are near the end and trigger the API call
      if (allVideo.length - activeVideoIndex <= 3 && hasMore && !loading) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } else if (hasMore) {
      // If we're at the last video and there's more data, fetch the next page
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  

  const handlePreviousVideo = () => {
    if (activeVideoIndex > 0) {
      setActiveVideoIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Handle scroll and key events
  useEffect(() => {
    let scrollTimeout;
    const handleScroll = (event) => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (event.deltaY > 0) {
          handleNextVideo();
        } else if (event.deltaY < 0) {
          handlePreviousVideo();
        }
      }, 150); // Adjust the delay as needed
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        handleNextVideo();
      } else if (event.key === "ArrowUp") {
        handlePreviousVideo();
      }
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideoIndex, allVideo.length, hasMore]);

  // Fetch videos when the currentPage is updated
  useEffect(() => {
    getAllVideos();
  }, [currentPage]);

  // Play video when active index changes
  useEffect(() => {
    playVideo(activeVideoIndex);
    return () => pauseVideo(activeVideoIndex);
  }, [activeVideoIndex]);

  // Start with first video playing
  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      playVideo(0);
    }
  }, [allVideo]);


  const overlayStyles = {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: '15px',
    color: '#fff',
    zIndex: 2
  };

  const gradientOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)',
    pointerEvents: 'none',
    zIndex: 1
  };

  const videoContainerStyles = {
    position: 'relative',
    width: '100%',
    height: '100%'
  };

  const tagStyles = {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '20px',
    margin: '0 4px 4px 0',
    fontSize: '14px'
  };

  const titleStyles = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px'
  };

  const descriptionStyles = {
    fontSize: '14px',
    opacity: '0.9',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const videoStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  };

  const scrollIconStyles = {
    position: 'fixed',
    right: '20px',
    zIndex: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white'
  };

  const expandedDetailsStyles = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)',
    padding: '20px',
    color: 'white',
    zIndex: 3,
    transition: 'all 0.3s ease'
  };

  const hashtagStyles = {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    margin: '4px',
    fontSize: '14px'
  };

  return (
    <>
    <Header />
<section className="video-reels">
        {/* Scroll Up Icon */}
        {/* <div 
          style={{ ...scrollIconStyles, top: '20px' }}
          onClick={handlePreviousVideo}
          className="scroll-icon-up"
        >
          ↑
        </div> */}

        {/* Scroll Down Icon */}
        {/* <div 
          style={{ ...scrollIconStyles, bottom: '20px' }}
          onClick={handleNextVideo}
          className="scroll-icon-down"
        >
          ↓
        </div> */}

        {allVideo.map((video, index) => (
          <div
            key={`${video._id}-${index}`}
            className={`video-scroll ${activeVideoIndex === index ? "active" : ""}`}
            style={{ position: 'relative' }}
          >
            <Link to={`/video-detail/?id=${video._id}`} onClick={(e) => {
              if (expandedVideo === video._id) {
                e.preventDefault();
              }
            }}>
              <div style={videoContainerStyles}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  style={videoStyles}
                  controls
                  loop
                  playsInline
                  preload="metadata"
                  data-index={index}
                >
                  <source src={video.videoLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Gradient Overlay */}
                <div style={gradientOverlayStyles} />

                {/* Top Text Overlay - Tags */}
                {/* <div style={{ ...overlayStyles, top: 0 }}>
                  <div>
                    <span style={tagStyles}>
                      #Smile
                    </span>
                  </div>
                </div> */}

                {/* Bottom Text Overlay - Title and Description */}
                {expandedVideo !== video._id ? (
                  <div style={{ ...overlayStyles, bottom: 0 }}>
                    <h3 style={titleStyles}>
                      {video.name || "Video Title"}
                    </h3>
                    <p style={descriptionStyles}>
                      {video?.description || "Video description goes here..."}
                      <span 
                        style={{ 
                          marginLeft: '4px', 
                          opacity: '0.7', 
                          cursor: 'pointer' 
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedVideo(video._id);
                        }}
                      >
                        more 
                      </span>
                    </p>
                  </div>
                ) : null}

                {/* Expanded Details */}
                {expandedVideo === video._id && (
                  <div style={expandedDetailsStyles}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '10px' 
                    }}>
                      <h3 style={titleStyles}>{video?.name}</h3>
                      <span 
                        style={{ cursor: 'pointer' }}
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedVideo(null);
                        }}
                      >
                        ✕
                      </span>
                    </div>
                    <p style={{ marginBottom: '15px' }}>{video.description}</p>
                    <div style={{ marginTop: '10px' }}>
                      {/* <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>Hashtags:</h4> */}
                      <div>
                        {
                        video.hashtagId.map((tag, i) => (
                          <span key={i} style={hashtagStyles}>
                            #{tag?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
        {loading && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100%', 
            height: '100%' 
          }}>
            <div>Loading...</div>
          </div>
        )}
      </section>
      <section className="video-ftr">
        <img src={Videoftr} alt="Footer Video Image 1" />
        <img src={Videoftr1} alt="Footer Video Image 2" />
      </section>
    </>
  );
};

export default VideoReels;
