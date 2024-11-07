import React, { useEffect, useState } from "react";
import AboutVideo from "../assets/image/aboutVideo.mp4";
import AboutVideo1 from "../assets/image/aboutVideo1.mp4";
import ValueIC1 from "../assets/image/valueIC1.svg";
import ValueIC2 from "../assets/image/valueIC2.svg";
import ValueIC3 from "../assets/image/valueIC3.svg";
import ValueIC4 from "../assets/image/valueIC4.svg";
import { Button, Col, Row } from "react-bootstrap";
import { serverApi } from "../config";
import axios from "axios";

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
          <source src={`http://localhost:8000${mediaUrl}`} type="video/mp4" />
        </video>
      );
    } else {
      return <img className="mediaImage" src={mediaUrl} alt="Content" />;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="geteternalpage">
      <div className="contentSec">
        <h3 className="contentHeading">Our Mission</h3>
        <p>
          {aboutContent?.ourMissionContent || "No mission content available"}
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
        <p>{aboutContent?.ourStoryContent || "No story content available"}</p>

        <h3 className="contentHeading">Our Vision</h3>
        <p>{aboutContent?.ourVisionContent || "No vision content available"}</p>

        <div className="valuesSec">
          <h3 className="contentHeading">Our Values</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap:"15px"
            }}
            dangerouslySetInnerHTML={{ __html: aboutContent?.ourValues }}
          />

          <h3 className="contentHeading">Join Us</h3>
          <p>{aboutContent?.joinUsContent || "No join us content available"}</p>
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
  );
};

export default Aboutus;
