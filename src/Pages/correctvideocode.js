import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { serverApi } from "../config";
import { Link } from "react-router-dom";
import Videoftr from "../assets/image/video-ftr-img.png";
import Videoftr1 from "../assets/image/video-ftr-img-1.svg";
import { useSelector } from "react-redux";

const VideoReels = () => {
  const [allVideo, setAllVideo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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
    } else if (hasMore) {
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


  

  return (
    <>
      <section className="video-reels">
        {allVideo.map((video, index) => (
          <div
            key={`${video._id}-${index}`}
            className={`video-scroll ${
              activeVideoIndex === index ? "active" : ""
            }`}
          >
            <Link to={`/video-detail/?id=${video._id}`}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="videoreal"
                controls
                loop
                playsInline
                preload="metadata"
                data-index={index}
              >
                <source src={video.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Link>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </section>
      <section className="video-ftr">
        <img src={Videoftr} alt="Footer Video Image 1" />
        <img src={Videoftr1} alt="Footer Video Image 2" />
      </section>
    </>
  );
};

export default VideoReels;
