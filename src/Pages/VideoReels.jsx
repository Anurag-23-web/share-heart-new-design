import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { serverApi } from "../config";
import Videoftr from "../assets/image/video-ftr-img.png";
import Videoftr1 from "../assets/image/video-ftr-img-1.svg";

const VideoReels = () => {
  const [allVideo, setAllVideo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  const videoRefs = useRef({});
  const observer = useRef();

  const getAllVideos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${serverApi}/video-reels/${currentPage}/${limit}`
      );
      const newVideos = response.data.data;

      if (newVideos.length < limit) {
        setHasMore(false);
      }

      setAllVideo((prev) => [...prev, ...newVideos]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      // Play the clicked video
      playVideo(video, index);
    } else {
      // Pause the clicked video
      pauseVideo(video, index);
    }
  };

  const playVideo = async (video, index) => {
    try {
      video.muted = true;
      await video.play();
      setTimeout(() => {
        video.muted = false;
      }, 100);

      setActiveVideoIndex(index);

      // Pause all other videos
      Object.entries(videoRefs.current).forEach(([idx, videoEl]) => {
        if (videoEl && parseInt(idx) !== index) {
          videoEl.pause();
          videoEl.muted = true;
        }
      });
    } catch (error) {
      console.log("Video playback failed:", error);
    }
  };

  const pauseVideo = (video, index) => {
    video.pause();
    video.muted = true;
    if (activeVideoIndex === index) {
      setActiveVideoIndex(null);
    }
  };

  const lastVideoElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setCurrentPage((prevPage) => prevPage + 1);
          }
        },
        {
          threshold: 0.1, // Trigger when 10% of the next video is visible
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleVideoVisibility = useCallback(() => {
    const options = {
      threshold: 0.1, // Trigger when 10% of the video is visible
    };

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const index = parseInt(video.dataset.index);

        if (entry.isIntersecting) {
          playVideo(video, index);
        } else {
          pauseVideo(video, index);
        }
      });
    }, options);

    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        videoObserver.observe(video);
      }
    });

    return () => {
      videoObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllVideos();
  }, [currentPage]);

  useEffect(() => {
    const cleanup = handleVideoVisibility();
    return () => {
      cleanup();
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
          video.muted = true;
        }
      });
    };
  }, [allVideo]);

  // Play the first video automatically when the page loads
  useEffect(() => {
    if (allVideo.length > 0) {
      const firstVideo = videoRefs.current[0];
      if (firstVideo) {
        playVideo(firstVideo, 0);
      }
    }
  }, [allVideo]);

  return (
    <>
      <section className="video-reels">
        {allVideo.map((video, index) => (
          <div
            key={`${video._id}-${index}`}
            className={`video-scroll ${activeVideoIndex === index ? 'active' : ''}`}
            ref={index === allVideo.length - 1 ? lastVideoElementRef : null}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="videoreal"
              controls
              loop
              playsInline
              preload="metadata"
              data-index={index}
              onClick={() => handleVideoClick(index)}
            >
              <source src={video.videoLink} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </section>
      <section className="video-ftr">
        <img src={Videoftr} alt="" />
        <img src={Videoftr1} alt="" />
      </section>
    </>
  );
};

export default VideoReels;