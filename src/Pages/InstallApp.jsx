import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Googleplay from "../assets/image/google-play.svg";
import Appstore from "../assets/image/app-store.svg";
import Background from "../assets/image/background-patterns.svg";
import Videoman from "../assets/image/video-man.gif"; 

const InstallApp = () => {
  return (
    <div>
 
      <section className="hero-section py-5">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col lg={6} md={6}>
              <div className="text-center">
                <h2 className="display-4">Install ShareHeart App</h2>
                <h4 className="mb-4">
                  Discover a community, Watch uplifting stories, Get Inspired, Share your story
                </h4>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="https://play.google.com/store/apps/details?id=com.shareheartapp.app">
                    <img className="img-fluid" src={Googleplay} alt="Google Play" />
                  </Link>
                  <Link to="https://apps.apple.com/us/app/shareheart/id6449276730">
                    <img className="img-fluid" src={Appstore} alt="App Store" />
                  </Link>
                </div>
              </div>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="video-session">
                <img className="img-fluid" src={Videoman} alt="Video demo" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

 
    </div>
  );
};

export default InstallApp;
