import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const TrabajoCardHome = (props) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const {
    titulo,
    director,
    portada,
    portada_webp,
    portada_avif,
    cliente,
    loop_mobile,
    loop_mp4,
  } = props.info;
  const { onAssetLoaded } = props;
  const videoRef = useRef();
  const { idDir, idVid } = props;
  const navigate = useNavigate();
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);


  const [isMobile, setIsMobile] = useState(screenWidth < 800);
  //CAMBIO DE PANTALLA
  const handleResize = () => {
    const newWidth = window.innerWidth;
    setScreenWidth(newWidth);
    setIsMobile(newWidth < 800);
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
  //autoPlay vid con code
  useEffect(() => {
    if (!isMobile) {
      const video = videoRef.current;
      const playVideo = () => {
        video.play().catch((error) => {
          // Manejar el error, por ejemplo, si el navegador bloquea la reproducción automática
          console.error("Error al reproducir el video:", error);
        });
      };
      // Esperar a que el video esté cargado antes de intentar reproducirlo

     video.addEventListener("canplaythrough", playVideo);
      setPlaying(true);

      return () => {
        // Limpiar el event listener cuando el componente se desmonta
        video.removeEventListener("canplaythrough", playVideo);
      };
    }
  }, []);

  useEffect(() => {
    // Determina si deberías cargar de inmediato o de forma diferida
    setShouldLoad(props.isImmediateLoad);
  }, [props.isImmediateLoad]);
  /// para hacer la carga

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: props.margin,
      threshold: 0.1,
    });

    const elementsToObserve = [
      videoRef.current,
      document.getElementById(idVid),
    ];

    elementsToObserve.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      elementsToObserve.forEach((element) => {
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [videoRef]);

  const cardRef = useRef();

  const addClass = () => {
  
    videoRef.current.play();
    setPlaying(true);
    cardRef.current?.querySelector("div.info_trabajo").classList.add("show");
    if (playing) {
      cardRef.current.classList.add("reveal");
      cardRef.current?.querySelector("div img").classList.add("noshow");
    }
  };
  const removeClass = () => {
    cardRef.current.classList.remove("reveal");
    cardRef.current?.querySelector("div img").classList.remove("noshow");
    cardRef.current?.querySelector("div.info_trabajo").classList.remove("show");
  //  videoRef.current.pause();
  };

  const checkLoad = () => {
    if (isMobile) {
      return "eager";
    } else {
      if (shouldLoad) {
        return "eager";
      } else {
        return "lazy";
      }
    }
  };

  return (
    <section
      className="trabajo_card_home"
      ref={cardRef}
      onTouchStart={addClass}
      onTouchEnd={removeClass}
    >
      <div className="info_trabajo" id={idVid}>
        <h3 className="bold trabajo_main trabajo_main-title" id={idVid}>
          {titulo}
        </h3>

        <h3 className="light trabajo_main trabajo_main-cliente">{cliente}</h3>
      </div>

      <div className="video_wrapper">
        <img
          src={shouldLoad ? `../assets/${portada}` : ""}
          className="trabajo_card_home-portada"
          alt={titulo}
          id={idVid}
          loading={checkLoad()}
        />
      </div>

      <div className="video_wrapper">
        {!isMobile ? (
          <video
            playsInline
           autoPlay
            muted
            loop
            ref={videoRef}
            id="back_vid"
            onLoadedData={onAssetLoaded}
            className="loop_desktop"
            loading={shouldLoad ? "eager" : "lazy"}
          >
            {shouldLoad && (
              <source src={`../assets/${loop_mp4}`} type="video/mp4" />
            )}
          </video>
        ) : (
          <video
            playsInline
            //   autoPlay
            muted
            loop
            ref={videoRef}
            id="back_vid"
            onLoadedData={onAssetLoaded}
            className="loop_mobile"
            loading="eager"
            poster={`../assets/${portada}`}
          >
            <source src={`../assets/${loop_mobile}`} />
          </video>
        )}
      </div>
    </section>
  );
};

export default TrabajoCardHome;
