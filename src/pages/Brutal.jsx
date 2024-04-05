import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { useContext, useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import DataContext from "../contexts/DataContext";

const Brutal = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data } = useContext(DataContext);
  const videoRef = useRef(null)
  const assetsToLoad = 4;
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const assetLoaded = () => {
    setAssetsLoaded((prevAssetsLoaded) => prevAssetsLoaded + 1);
  };
  const [textos, setTextos] = useState({ p_1: "", linkto: "" });
  useEffect(() => {
    if (data.brutal) {
      setTextos(data.brutal[0]);
    }
  }, [data]);
  useEffect(() => {
    if (assetsLoaded === assetsToLoad) {
      setIsLoaded(true);
    }
  }, [assetLoaded]);



  const datos = [
    {
      imgfondo: "../assets/brutal/bg-brutal.webp",
      imgfondo_mob: "../assets/brutal/bg-brutal_mob.webp",
      gif: "../assets/brutal/brutal.gif",
      video: "../assets/brutal/brutal.webm",
      video_mp4: "../assets/brutal/brutal.mp4",
      logo: "../assets/brutal/brutal_logo.png",
    },
  ];


  useEffect(() => {
    const video = videoRef.current;

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
  return (
    <>
      <Nav />
      <Loader clase={isLoaded ? "loader-loaded" : ""} />
      <section className="layout layout_fr brutal">
         <img
          className="brutal_background"
          src={datos[0].imgfondo}
          alt="fondo"
        />
        <img
          className="brutal_background-mobile"
          src={datos[0].imgfondo_mob}
          alt="fondo"
          onLoad={assetLoaded}
        /> 
        <video
          className="brutal_gif"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={assetLoaded}
          ref={videoRef}
        >
          <source src={datos[0].video_mp4} type="video/mp4" />
        </video>
        <img
          className="brutal_logo slide slide_fl"
          src={datos[0].logo}
          alt="brutal logo"
          onLoad={assetLoaded}
        />
        <div className="big_title">
          <img src="../assets/brutal/brutal_banner.png" alt="texto" />
        </div>
        <p className="brutal_info brutal_info-desktop">{textos.p_1}</p>
        <p className="brutal_info brutal_info-mobile">{textos.p_1}</p>

        <Link
          to={`${textos.linkto}`}
          target="_blank"
          className="link_to_work"
        >
          <img src="../assets/brutal/link_work.svg" alt="link" onLoad={assetLoaded} />
        </Link>
      </section>
    </>
  );
};

export default Brutal;
