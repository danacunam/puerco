import { useContext, useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import DataContext from "../contexts/DataContext";
import Loader from "../components/Loader";

const Service = () => {
  const { data } = useContext(DataContext);
  const [textos, setTextos] = useState({ p_1: "", emailto: "" });
  const videoRef = useRef(null);

  const emailAddress = "hola@puerco.tv"; // Cambia esto por tu dirección de correo electrónico

  const copyToClipboard = () => {
    const textField = document.createElement("textarea");
    textField.innerText = emailAddress;
    document.body.appendChild(textField);
    textField.select();

    try {
      document.execCommand("copy");
      alert(`Email copiado al portapapeles: ${emailAddress}`);
    } catch (err) {
      console.error("No se pudo copiar al portapapeles: ", err);
    } finally {
      document.body.removeChild(textField);
    }
  };

  const datos = [
    {
      banner: "../assets/service/bg-service.png",
      banner_mobile: "../assets/service/bg-service_mobile.png",
      video_mp4: "../assets/service/service_loop.mp4",
    },
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const assetsToLoad = 1;
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  //carga de assets
  const assetLoaded = () => {
    setAssetsLoaded((prevAssetsLoaded) => prevAssetsLoaded + 1);
  };

  useEffect(() => {
    if (data.service) {
      setTextos({ p_1: data.service[0].p_1, emailto: data.service[0].emailto });
    }
  }, [data]);
  useEffect(() => {
    if (assetsLoaded >= assetsToLoad) {
      //   setIsLoaded(true);
    }
  }, [assetLoaded]);

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
    setIsLoaded(true);

    return () => {
      // Limpiar el event listener cuando el componente se desmonta
      video.removeEventListener("canplaythrough", playVideo);
    };
  }, []);
  return (
    <>
      <Nav clase="service_nav" />
      <Loader clase={isLoaded ? "loader-loaded" : ""} />
      <section className="layout layout_fr service">
        <img
          src={datos[0].banner}
          alt={datos[0].banner}
          className="service_banner"
          onLoad={assetLoaded}
        />
        <img
          src={datos[0].banner_mobile}
          alt={datos[0].banner_mobile}
          className="service_banner-mobile"
          onLoad={assetLoaded}
        />

        <section className="service_bottom">
          <p
            className="service_bottom-text"
            dangerouslySetInnerHTML={{ __html: textos.p_1 }}
          ></p>
          <a className="contact_button" onClick={() => copyToClipboard()}>
            <img src="../assets/misc/ellipse.svg" alt="ellipse" />
            <p className="bold">CONTACT</p>
          </a>
        </section>
        <div className="service_video">
          <video
            src={datos[0].video_mp4}
            autoPlay
            loop
            muted
            playsInline
            ref={videoRef}
          ></video>
        </div>
      </section>
    </>
  );
};

export default Service;
