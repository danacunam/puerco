import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import DataContext from "../contexts/DataContext";
import Loader from "../components/Loader";
import AnimateContext from "../contexts/AnimationContext";

const FeaturedVideos = () => {
  const { id } = useParams();
  const [playing, setPlaying] = useState(false);
  const [width, setWidth] = useState(null);
  const [video, setVideo] = useState({ url: "", poster: "" });
  const { data } = useContext(DataContext);
  const [trabajos_home, setTrabajosHome] = useState([]);
  const { animate, AnimateDispatch } = useContext(AnimateContext);

  const [animationClass, setAnimationClass] = useState("");
  const [textAnimationClass, setTextAnimationClass] = useState("");

  const checkLink = (id_dir) => {
    const hasProjects = data.directores.find(
      (dir) => dir.director_id === id_dir
    );
    if (hasProjects) {
      navigate(`/directors/${id_dir}`);
    }
  };

  const animation = () => {
    setAnimationClass("fade-in fade-in-longer");
    setTextAnimationClass("fade-in fade-in-longer");
  };

  useEffect(() => {
    if (data.featured) {
      setVideo({
        poster: data.featured[id].portada,
        url_mp4: data.featured[id].video_mp4,
      });
    }
  }, [id]);

  useEffect(() => {
    setWidth(window.innerWidth);
    AnimateDispatch({ type: "SHOW" });
  }, []);

  useEffect(() => {
    if (data.featured) {
      setTrabajosHome(data?.featured);
      setVideo({
        poster: data.featured[id].portada,
        url_mp4: data.featured[id].video_mp4,
      });
    }
    setAnimationClass("slide_fr");
    setTextAnimationClass("slide_fl");

  }, [data]);

  const navigate = useNavigate();
  const goNext = () => navigate(`/featured_videos/${parseInt(id) + 1}`);
  const goPrev = () => navigate(`/featured_videos/${parseInt(id) - 1}`);

  const checkPrev = () => {
    setAnimationClass("fade-out");
    setTextAnimationClass("fade-out");

    if (playing) {
      setPlaying(false);
    }

    if (id > 0) {
      setTimeout(goPrev, 100);
      setTimeout(animation, 300);
    } else {
      navigate(`/`);
    }
  };

  const checkNext = () => {
    setAnimationClass("fade-out");
    setTextAnimationClass("fade-out");
    if (playing) {
      setPlaying(false);
    }
    if (id < trabajos_home.length - 1) {
      setTimeout(goNext, 100);
      setTimeout(animation, 300);
    }
  };
  const loaded = () =>{
    AnimateDispatch({type:"HIDE"})
  }
  return (
    <>
      <Nav />
      <Loader clase={`loader ${animate.animation ? "" : "loader-loaded"}`} />
      <section className="single_video single_video-featured layout">
        <VideoPlayer
          src={video?.url}
          src_mp4={video?.url_mp4}
          poster={video.poster}
          playing={playing}
          setPlaying={setPlaying}
          clase={`slide ${animationClass}`}
          assetLoaded={loaded}
        />
        <img
          className="stop_btn slide slide_fl"
          src="../assets/misc/close_mob.png"
          alt="close btn"
          onClick={() => navigate("/")}
        />
        <section className="bottom_section">
          <img
            className="prev"
            src="../assets/misc/prev.png"
            alt="prev button"
            onClick={checkPrev}
          />

          <section className="video_info">
            <h2 className={`job_title bold slide ${textAnimationClass}`}>
              {trabajos_home[id]?.titulo} - {trabajos_home[id]?.cliente}
            </h2>
            <h3
              className={`light featured_director slide ${textAnimationClass}`}
            >
              Director / &nbsp;
              <span
                className="link_to_dir"
                onClick={() => {
                  checkLink(trabajos_home[id]?.director_id);
                }}
              >
                {trabajos_home[id]?.director}
              </span>{" "}
            </h3>
          </section>
          {id < trabajos_home.length - 1 && (
            <img
              className="next"
              src="../assets/misc/next.png"
              alt="next button"
              onClick={checkNext}
            />
          )}
        </section>
      </section>
    </>
  );
};

export default FeaturedVideos;
