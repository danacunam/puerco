import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContactUs from "../components/ContactUs";
import Nav from "../components/Nav";
import TrabajoCardHome from "../components/TrabajoCardHome";

import Redes from "../components/Redes";
import Loader from "../components/Loader";
import DataContext from "../contexts/DataContext";
import JoinUs from "../components/JoinUs";

const Home = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(screenWidth < 800);
  const { data } = useContext(DataContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [trabajos_home, setTrabajosHome] = useState([]);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const [assetsToLoad, setAssetsToLoad] = useState(1);
  //carga de assets
  const homeVidRef = useRef(null);
  const homeVidRefMobile = useRef(null);
  const assetLoaded = () => {
    setAssetsLoaded((prevAssetsLoaded) => prevAssetsLoaded + 1);
  };

  useEffect(() => {
    if (assetsToLoad === 0) {
      return;
    }

    if (assetsLoaded >= assetsToLoad) {
      setIsLoaded(true);
    }
  }, [assetLoaded, assetsToLoad]);

  useEffect(() => {
    if (data.featured) {
      setTrabajosHome(data?.featured);
    }
  }, [data]);

  useEffect(() => {
    const video = isMobile ? homeVidRefMobile.current : homeVidRef.current;

    const playVideo = () => {
      video.play().catch((error) => {
        // Manejar el error, por ejemplo, si el navegador bloquea la reproducción automática
        console.error("Error al reproducir el video:", error);
      });
    };
    // Esperar a que el video esté cargado antes de intentar reproducirlo
    video.addEventListener("canplaythrough", playVideo);
    return () => {
      // Limpiar el event listener cuando el componente se desmonta
      video.removeEventListener("canplaythrough", playVideo);
    };
  }, []);

  //CAMBIO DE PANTALLA
  const handleResize = () => {
    const newWidth = window.innerWidth;
    setScreenWidth(newWidth);
    setIsMobile(newWidth < 800);

    if (newWidth < 800) {
      setAssetsToLoad(2);
    }
  };

  useEffect(() => {
    // Agregar un event listener para el evento "resize".
    window.addEventListener("resize", handleResize);

    // Manejar cambios de orientación utilizando window.orientation.
    const handleOrientationChange = () => {
      handleResize();
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    // Limpieza de event listeners cuando el componente se desmonta.
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  return (
    <section
      className="home"
      style={{ overflow: !isLoaded ? "hidden" : "initial" }}
    >
      <Nav clase="home" />
      <Loader clase={isLoaded ? "loader-loaded" : ""} />
      <section className="home_top layout layout_fr">
        {isMobile === false ? (
          <video
            className="desktop"
            src="../assets/home/homebg.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={assetLoaded}
            ref={homeVidRef}
          />
        ) : (
          <video
            className="mobile"
            src="../assets/home/homebg-mobile.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={assetLoaded}
            ref={homeVidRefMobile}
          ></video>
        )}

        <img className="arrow" src="../assets/misc/arrow.png" alt="flecha" />
      </section>
      <section className="home_mid">
        {trabajos_home.map((trabajo, index) => {
          return (
            <Link to={`/featured_videos/${index}`} key={index}>
              <TrabajoCardHome
                isImmediateLoad={index > 2 ? false : true}
                info={trabajo}
                onAssetLoaded={assetLoaded}
                margin="150px"
              />
            </Link>
          );
        })}
      </section>
      <section className="home_bottom">
        <ContactUs />
        <JoinUs />
        <Redes />
      </section>
    </section>
  );
};

export default Home;
