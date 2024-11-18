import React, { useEffect, useState } from "react";
import logo1 from "../assets/image/mychurch.svg";
import Geteternallife from "../assets/image/get-eternal-life.svg";
import FooterIC1 from "../assets/image/footerIC1.svg";
import FooterIC2 from "../assets/image/footerIC2.svg";
import FooterIC3 from "../assets/image/footerIC3.svg";
import FooterIC4 from "../assets/image/youtube-1.svg";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { serverApi } from "../config";
import Loader from "../Components/Loader";

const VideoDetail = () => {
  const [loading, setLoading] = useState(false);
  const [singleVideo, setSingleVideo] = useState();
  const [tag, setTag] = useState("");
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("id");

  useEffect(() => {
    if (videoId) {
      getSingleVideos();
    }
  }, [videoId]);

  const getSingleVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${serverApi}/get_individual_video/${videoId}`
      );
      console.log(response?.data?.features);
      setSingleVideo(response?.data?.data);
      setTag(response?.data?.features);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to check if a link is present, if not, redirect to the login page
  const handleRedirect = (url, loginUrl) => {
    if (url) {
      return url;
    } else {
      return loginUrl; // Redirect to login page if the URL is missing
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <Loader /> {/* You should have a Loader component here */}
        </div>
      )}
      <section className="video-reels">
        <div style={{display:"flex",justifyContent:"center"}}>
          <video
            key={singleVideo?.videoLink}
            className="videoreal"
            autoPlay
            controls
            loop
          >
            <source src={singleVideo?.videoLink} type="video/mp4" />
          </video>
        </div>
        <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
          <h3>{singleVideo?.name}</h3>
          <p>{singleVideo?.description || "There is no description"}</p>
          <p>
            {tag?.length > 0
              ? tag.map((tag, i) => <span key={i}>#{tag?.label} </span>)
              : "There is no description"}
          </p>

      
        </div>
        <div className="video-dtl-share">
          <ul className="footerSocial">
            <li className="flt-img">
              <Link
                to={handleRedirect(
                  singleVideo?.tiktokLink,
                  "https://www.tiktok.com/login"
                )}
              >
                <img src={FooterIC3} alt="Tiktok" />
              </Link>
            </li>

            <li className="flt-img">
              <Link
                to={handleRedirect(
                  singleVideo?.facebookLink,
                  "https://www.facebook.com/login"
                )}
              >
                <img src={FooterIC1} alt="Facebook" />
              </Link>
            </li>

            <li className="flt-img">
              <Link
                to={handleRedirect(
                  singleVideo?.instagramLink,
                  "https://www.instagram.com/accounts/login/"
                )}
              >
                <img src={FooterIC2} alt="Instagram" />
              </Link>
            </li>

            <li className="flt-img">
              <Link
                to={handleRedirect(
                  singleVideo?.youtubeLink,
                  "https://www.youtube.com/"
                )}
              >
                <img src={FooterIC4} alt="YouTube" />
              </Link>
            </li>

            <li>
              <Link to={handleRedirect(singleVideo?.churchLink, "#")}>
                <img src={logo1} alt="Church" />
              </Link>
            </li>

            <li>
              <Link to={handleRedirect(singleVideo?.churchLink, "#")}>
                <img src={Geteternallife} alt="Get Eternal Life" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default VideoDetail;
