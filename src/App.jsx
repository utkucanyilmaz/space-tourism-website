import { useState, useEffect } from "react";
import Header from "./components/Header";
import Destination from "./pages/Destination";
import Home from "./pages/Home";
import Crew from "./pages/Crew";
import Technology from "./pages/Technology";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";

function App() {
  let location = useLocation().pathname;
  let bgImage;

  const [windowSize, setWindowSize] = useState(getWindowSize());

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  function handleWindowResize() {
    setWindowSize(getWindowSize());
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  switch (location) {
    case "/destination":
      bgImage =
        "bg-destination-mobile md:bg-destination-tablet xl:bg-destination-desktop";
      break;

    case "/crew":
      bgImage = "bg-crew-mobile md:bg-crew-tablet xl:bg-crew-desktop";
      break;

    case "/technology":
      bgImage =
        "bg-technology-mobile md:bg-technology-tablet xl:bg-technology-desktop";
      break;

    default:
      bgImage = "bg-home-mobile md:bg-home-tablet xl:bg-home-desktop";
      break;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`${bgImage} bg-no-repeat bg-center bg-cover h-screen overflow-x-hidden xl:overflow-hidden pb-10 relative`}
      >
        {windowSize.innerWidth >= 768 && (
          <div className="absolute h-24 w-[57%] lg:w-[45%] xl:w-[57%] right-0 backdrop-blur-lg bg-white bg-opacity-5 xl:mt-12"></div>
        )}

        {windowSize.innerWidth < 768 && <Header windowSize={windowSize} />}

        <div className="container mx-auto text-lg">
          {windowSize.innerWidth >= 768 && <Header windowSize={windowSize} />}
          <AnimatePresence mode="wait">
            <Routes key={location} location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/destination" element={<Destination />} />
              <Route path="/crew" element={<Crew />} />
              <Route path="/technology" element={<Technology />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}

export default App;
