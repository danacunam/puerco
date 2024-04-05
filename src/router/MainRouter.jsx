import { lazy } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Brutal = lazy(() => import("../pages/Brutal"));
const Directors = lazy(() => import("../pages/Directors"));
const Service = lazy(() => import("../pages/Service"));
const SingleVideo = lazy(() => import("../pages/SingleVideo"));
const FeaturedVideos = lazy(() => import("../pages/FeaturedVideos"));

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/brutal" element={<Brutal />} />
        <Route path="/directors/:id" element={<Directors />} />
        <Route
          path="/directors_videos/:combinedParams"
          element={<SingleVideo clase={'single_video-director'} />}
        />
        <Route path="/featured_videos/:id" element={<FeaturedVideos />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
