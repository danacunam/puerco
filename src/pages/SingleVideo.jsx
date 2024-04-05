import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Loader from "../components/Loader";
import { url } from "../helpers/info";
import axios from "axios";
import DataContext from "../contexts/DataContext";
import AnimateContext from "../contexts/AnimationContext";

const SingleVideo = (props) => {
  const { clase } = props;
  const { combinedParams } = useParams();
  const [id, id_2] = combinedParams.split("_");
  const [playing, setPlaying] = useState(false);
  const [width, setWidth] = useState(null);
  const [proyectos, setProyectos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [textAnimationClass, setTextAnimationClass] = useState("");
  const { animate, AnimateDispatch } = useContext(AnimateContext);

  const [video, setVideo] = useState({
    url: "",
    poster: "",
    titulo: "",
    cliente: "",
  });
  const [director, setDirectorName] = useState("");
  const { data } = useContext(DataContext);

 // const [isLoaded, setIsLoaded] = useState(true);
  //const assetsToLoad = 0;
//  const [assetsLoaded, setAssetsLoaded] = useState(0);
 /*  const assetLoaded = () => {
    setAssetsLoaded((prevAssetsLoaded) => prevAssetsLoaded + 1);
  }; */

 /*  useEffect(() => {
    if (assetsLoaded > assetsToLoad) {
      setIsLoaded(true);
    }
  }, [assetLoaded]); */

  useEffect(() => {
    if (proyectos.length > 0) {
      // const videoActual = proyectos.find((video) => video.proyecto_id == id_2);
      setVideo({
        url_mp4: proyectos[id_2].video_mp4,
        poster: proyectos[id_2].portada,
        titulo: proyectos[id_2].titulo,
        cliente: proyectos[id_2].cliente,
        id: proyectos[id_2].proyecto_id,
      });
    }
  }, [proyectos, id_2]);

  const getVideos = async () => {
    const videos = await axios.get(`${url}?endpoint=proyectos&id=${id}`);
    const main = videos.data.filter((director) => director.destacado === 1);

    const second = videos.data.filter((director) => director.destacado !== 1);
    second.unshift(main[0]);
    setProyectos(second);
    AnimateDispatch({ type:"HIDE" });

  };

  useEffect(() => {
    if (data.directores) {
      const nombre = data.directores.filter(
        (director) => director.director_id === id
      );
      setDirectorName(nombre[0].nombre);
    }
    setAnimationClass("slide_fr");
    setTextAnimationClass("slide_fl");
  }, [data, id]);

  useEffect(() => {
    AnimateDispatch({type:"SHOW"})
    getVideos();
  }, []);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const animation = () => {
    setAnimationClass("fade-in fade-in-longer");
    setTextAnimationClass("fade-in fade-in-longer");
  };

  const navigate = useNavigate();
  const goNext = () =>
    navigate(`/directors_videos/${id}_${parseInt(id_2) + 1}`);
  const goPrev = () =>
    navigate(`/directors_videos/${id}_${parseInt(id_2) - 1}`);

  const checkPrev = () => {
    setAnimationClass("fade-out");
    setTextAnimationClass("fade-out");
    if (id_2 > 0) {
      setPlaying(false);
      setTimeout(goPrev, 100);
      setTimeout(animation, 300);
    } else {
      navigate(`/directors/${id}`);
    }
  };

  const checkNext = () => {
    setAnimationClass("fade-out");
    setTextAnimationClass("fade-out");
    if (parseInt(id_2) < proyectos.length - 1) {
      setPlaying(false);
      setTimeout(goNext, 100);
      setTimeout(animation, 300);
    }
  };

  const CheckArrow = () => {
    if (id_2 < proyectos.length - 1) {
      return (
        <img
          className="next"
          src="../assets/misc/next.png"
          alt="next button"
          onClick={checkNext}
        />
      );
    }
  };
 

  return (
    <>
      <Nav />
      <Loader clase={`loader ${animate.animation ?  "": "loader-loaded" }`} />
      <section className={`single_video single_video-desktop ${clase}`}>
        <h2 className="director_name light slide slide_fl">{director}</h2>
        {clase === "single_video-director" && (
          <img
            className="stop_btn"
            src="../assets/misc/close_mob.png"
            alt="close btn"
            onClick={() => {
              navigate(`/directors/${id}`);
            }}
          />
        )}
        <VideoPlayer
          //src={video.url}
          src_mp4={video.url_mp4}
          poster={video.poster}
          playing={playing}
          setPlaying={setPlaying}
          clase={`slide ${animationClass}`}
        />
        <h2 className="work_title"></h2>

        <section className="bottom_section">
          <img
            className="prev"
            src="../assets/misc/prev.png"
            alt="prev button"
            onClick={checkPrev}
          />
          <section className={`video_info slide ${textAnimationClass}`}>
            <h2 className="job_title bold">
              {video?.titulo} - {video?.cliente}
            </h2>
          </section>

          {CheckArrow()}
        </section>
      </section>
      {/* VIDEO EN MOBILE */}
      <section className="single_video single_video-featured single_video-featured-director">
        <section className="top_single"></section>
        <VideoPlayer
          src_mp4={video.url_mp4}
          poster={video.poster}
          playing={playing}
          setPlaying={setPlaying}
          clase={`slide  ${animationClass}`}
      //    assetLoaded={assetLoaded}
        />

        <section className="bottom_section">
          <img
            className="prev"
            src="../assets/misc/prev.png"
            alt="prev button"
            onClick={checkPrev}
          />
          <h2 className="director_name light slide slide_fl"></h2>

          <section className="video_info slide slide_fr">
            <h2 className="job_title bold">
              {video?.titulo} - {video?.cliente}
            </h2>
          </section>

          {CheckArrow()}
        </section>
      </section>
    </>
  );
};

export default SingleVideo;
