import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ videoUrl, loaderFun, isMuted, activeIndex }) => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (activeIndex) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleLoadedData = () => {
    setIsVideoLoaded(true);
    if (loaderFun) {
      loaderFun();
    }
  };

  const handleError = (e) => {
    console.error("Error loading video:", e);
    setIsVideoLoaded(false);
  };

  const clickVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video on click:", error);
      });
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div>
      {!isVideoLoaded && <p>Loading video...</p>}
      <video
        ref={videoRef}
        playsInline
        muted={isMuted}
        preload="auto"
        loop
        autoPlay
        onLoadedData={handleLoadedData}
        onError={handleError}
        onClick={clickVideo}
      >
        <source src={videoUrl} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
    </div>
  );
};

export default VideoPlayer;
