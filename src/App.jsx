import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Aboutus from "./Pages/Aboutus";
import GetEternalLife from "./Pages/GetEternalLife";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermService from "./Pages/TermService";
import JoinUs from "./Pages/JoinUs";
import ContactUs from "./Pages/ContactUs";
import UploadStory from "./Pages/UploadStory";
import VideoReels from "./Pages/VideoReels";
import VideoDetail from "./Pages/VideoDetail";
import Language from "./Pages/Language";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import InstallApp from "./Pages/InstallApp";
import HelpDesk from "./Pages/HelpDesk";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useEffect } from "react";
// import Video  from "./Pages/Video";



function Layout() {
  const location = useLocation();
  const hideHeaderFooterRoutes = ["/video-reels", "/video-detail", "/language"];

  const shouldShowHeaderFooter = !hideHeaderFooterRoutes.includes(
    location.pathname
  );

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, []);

  return (
    <>
      {shouldShowHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/get-eternal-life" element={<GetEternalLife />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-service" element={<TermService />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/upload-story" element={<UploadStory />} />
        <Route path="/video-reels" element={<VideoReels />} />
        <Route path="/video-detail" element={<VideoDetail />} />
        <Route path="/language" element={<Language />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/install-app" element={<InstallApp />} />
        <Route path="/help-desk" element={<HelpDesk />} />
        {/* <Route path="/video" element={<Video />} /> */}
     
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {" "}
              <Profile />{" "}
            </ProtectedRoute>
          }
        />
      </Routes>
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
