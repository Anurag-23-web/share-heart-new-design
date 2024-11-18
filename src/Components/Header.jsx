import React, { useRef, useEffect, useState } from "react";
import MenuIcon from "../assets/image/menuIcon.svg";
import Logo from "../assets/image/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UploadIc from "../assets/image/uploadIc.svg";
import ShopIc from "../assets/image/shopIc.svg";
import EternalIc from "../assets/image/eternalIc.svg";
import CrossIc from "../assets/image/crossIc.svg";
import { User } from "lucide-react";

const Header = () => {
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);

  const menuLinksRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const div1 = div1Ref.current;
    const div2 = div2Ref.current;
    const menuLinks = menuLinksRef.current.querySelectorAll("a");

    const addBodyClass = () => {
      document.body.classList.add("menu-active");
    };

    const removeBodyClass = () => {
      document.body.classList.remove("menu-active");
    };

    if (div1) {
      div1.addEventListener("click", addBodyClass);
    }

    if (div2) {
      div2.addEventListener("click", removeBodyClass);
    }

    menuLinks.forEach((link) => {
      link.addEventListener("click", removeBodyClass);
    });

    return () => {
      if (div1) {
        div1.removeEventListener("click", addBodyClass);
      }
      if (div2) {
        div2.removeEventListener("click", removeBodyClass);
      }
      menuLinks.forEach((link) => {
        link.removeEventListener("click", removeBodyClass);
      });
    };
  }, []);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  // Close modal when clicking outside of it
  const handleOutsideClick = (e) => {
    if (
      modalOpen &&
      !e.target.closest(".userProfileModal") &&
      !e.target.closest(".userIcon")
    ) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [modalOpen]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setModalOpen(false);
  };

  return (
    <div>
      <div className="headerSec">
        <div className="headerMenu" ref={div1Ref}>
          <img alt="menuicon" src={MenuIcon} />
        </div>

        <div className="headerLogo">
          <Link to="/">
            <img alt="logo" src={Logo} />
          </Link>
        </div>

        {location.pathname !== "/login" && location.pathname !== "/signup" ? (
          userId ? (
            <div
              className="userIcon"
              style={{
                background: "lightblue",
                width: "60px",
                height: "60px",
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: "50px",
                cursor: "pointer",
              }}
              onClick={toggleModal}
            >
              <User />
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                right: "50px",
                top: "45px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/login")} // Redirect to login page
            >
              <p style={{ fontWeight: "600" }}>Login</p>
            </div>
          )
        ) : null}

        {modalOpen && (
          <div
            className="userProfileModal"
            style={{
              position: "absolute",
              top: "90px", // Adjust as needed to appear under the icon
              right: "30px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "150px",
              padding: "10px",
            }}
          >
            <ul style={{ padding: 0, listStyleType: "none" }}>
              <li>
                <Link
                  to="/profile"
                  onClick={() => setModalOpen(false)}
                  style={{
                    textDecoration: "none",
                    listStyleType: "none",
                    color: "black",
                    fontSize: "20px",
                  }}
                >
                  Profile
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link
                  style={{
                    textDecoration: "none",
                    listStyleType: "none",
                    color: "black",
                    fontSize: "20px",
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="menusidebar">
        <div className="crossMenu" ref={div2Ref}>
          <img src={CrossIc} />
        </div>
        <div className="menusidebarin" ref={menuLinksRef}>
          <div className="topMenu">
            <ul>
              <li className="topMenuitm">
                <Link to="/upload-story">
                  <img src={UploadIc} /> <span>Upload</span>
                </Link>
              </li>
              <li className="topMenuitm">
                <Link to="/">
                  <img src={ShopIc} /> <span>Shop</span>
                </Link>
              </li>
              <li className="topMenuitm">
                <Link to="/get-eternal-life">
                  <img src={EternalIc} /> <span>Get Eternal Life</span>
                </Link>
              </li>
            </ul>
            <div className="topMenulink">
              <Link to="/video-reels">Watch Real Stories</Link>
            </div>
            {/* <div className="topMenulink">
              <Link to="/video"> Reel</Link>
            </div> */}
          </div>
          <div className="menuLinks">
            <div className="menulnkHeading">Company</div>
            <ul>
              <li>
                <Link to="/language">Language</Link>
              </li>
              {userId && (
                <li>
                  <Link to="/hashtags">Hashtags</Link>
                </li>
              )}
              <li>
                <Link to="/about-us">About</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact</Link>
              </li>
              <li>
                <Link to="/join-us">Join US</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/help-desk">Helpdesk</Link>
              </li>
              <li>
                <Link to="/volunteer">Volunteer</Link>
              </li>
              <li>
                <Link to="/install-app">Install App</Link>
              </li>
            </ul>
            <div className="menulnkHeading">Legal</div>
            <ul>
              <li>
                <Link to="/terms-service">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="menucopyright">@ 2024 WowSquare LLC</div>
      </div>
    </div>
  );
};

export default Header;
