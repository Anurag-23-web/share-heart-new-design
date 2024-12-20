import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { serverApi } from "../config";
import axios from "axios";
import Loader from "../Components/Loader"; // Import the Loader component

const Aboutus = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(`${serverApi}/get_about_content`);
      setAboutContent(response?.data?.data[0]);
    } catch (err) {
      console.log(err.message);
      setError("Failed to load content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isVideo = (url) => /\.(mp4|mov|avi|webm|mkv)$/i.test(url);

  const renderMedia = (mediaUrl) => {
    if (isVideo(mediaUrl)) {
      return (
        <video className="videoreal" autoPlay muted loop>
          <source src={`${serverApi}`+ mediaUrl} type="video/mp4" />
        </video>
      );
    } else {
      return <img className="mediaImage" src={`${serverApi}`+ mediaUrl} alt="Content" />;
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className={loading ? "content-opacity" : "content-visible"}>
        <div className="geteternalpage">
          <div className="contentSec">
            <h3 className="contentHeading">Our Mission</h3>
            <p>
              {aboutContent?.ourMissionContent ||
                "No mission content available"}
            </p>
            <div className="aboutVideo">
              <div className="videoPartin">
                {aboutContent?.fVideo && renderMedia(aboutContent?.fVideo)}
              </div>
              <div className="videoPartin">
                {aboutContent?.sVideo && renderMedia(aboutContent?.sVideo)}
              </div>
            </div>

            <h3 className="contentHeading">Our Story</h3>
            <p>
              {aboutContent?.ourStoryContent || "No story content available"}
            </p>

            <h3 className="contentHeading">Our Vision</h3>
            <p>
              {aboutContent?.ourVisionContent || "No vision content available"}
            </p>

            <div className="valuesSec">
              <h3 className="contentHeading">Our Values</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "15px",
                }}
                dangerouslySetInnerHTML={{ __html: aboutContent?.ourValues }}
              />

              <h3 className="contentHeading">Join Us</h3>
              <p>
                {aboutContent?.joinUsContent || "No join us content available"}
              </p>
            </div>
          </div>

          <section className="homesubmit">
            <div className="homesubmitin">
              <h2 className="headingtype2">Submit your story now</h2>
              <Button type="submit" variant="danger">
                Submit now
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
