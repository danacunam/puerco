import { useEffect, useRef } from "react";

const VideoPlayer = (props) => {
  const { src, poster, playing, setPlaying, clase, src_mp4, assetLoaded } =
    props;
  const video = useRef();

  const setPlay = () => {
    video?.current?.play();
    setPlaying(true);
  };

  useEffect(() => {
    video.current.pause();
    setPlaying(false);
  }, [src]);

  return (
    <section className={`video ${clase || ""}`}>
      <video
        ref={video}
       // poster={`../assets/${poster}`}
        controls={playing}
        loop
        className={`${playing ? "show_controls" : "hide_controls"}`}
        playsInline
        src={`../assets/${src_mp4}`}
       // onLoadedData={assetLoaded}
      />
        {!playing && (
          <img
            src={`../assets/${poster}`}
            alt={poster}
            className="director_poster"
            onLoad={assetLoaded}
          />
        )}
      {!playing && <img src="../assets/misc/play.png" onClick={setPlay} />}
    </section>
  );
};

export default VideoPlayer;
