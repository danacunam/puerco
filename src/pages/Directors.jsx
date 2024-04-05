import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import TrabajoCardHome from "../components/TrabajoCardHome";
import Loader from "../components/Loader";
import { url } from "../helpers/info";
import DataContext from "../contexts/DataContext";
import axios from "axios";
import AnimateContext from "../contexts/AnimationContext";

const Directors = () => {
  const { id } = useParams();
  const { data } = useContext(DataContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [assetsToLoad, setAssetsToLoad] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [textAnimationClass, setTextAnimationClass] = useState("");
  const [proyectos, setProyectos] = useState([]);
  const [mainWork, setMainWork] = useState({});
  const [directorName, setDirectorName] = useState("");
  const navigate = useNavigate();

  //CARGA DE ASSETS

  const assetLoaded = () => {
    setAssetsLoaded((prevAssetsLoaded) => prevAssetsLoaded + 1);
  };
 

  const { animate, AnimateDispatch } = useContext(AnimateContext);
  // ANCHO DE PANTALLA

  const getData = async () => {
    const directors = await axios.get(`${url}?endpoint=proyectos&id=${id}`);
    if (directors.data.length === 0) {
      navigate("/");
    }
    const main = directors.data.find((director) => director.destacado === 1);

    const second = directors.data.filter(
      (director) => director.proyecto_id !== main.proyecto_id
    );
    second.unshift(main);
    setProyectos(second);
    setAssetsToLoad(second.length - 1); //estaba en linea 71 (por si falla)
    setIsLoaded(true);
    AnimateDispatch({ type: "HIDE" });
    setTextAnimationClass("slide_flop");
  };

  useEffect(() => {
    if (data.directores) {
      const nombre = data.directores.filter(
        (director) => director.director_id === id
      );
      setDirectorName(nombre[0].nombre);
    }
  }, [data, id]);

  useEffect(() => {
    setTextAnimationClass("fade-out");
    setProyectos([]);
    setMainWork([]);
    getData();
  }, [id]);

  return (
    <section className="director">
      <Nav />
      <Loader clase={animate.animation ? "" : "loader-loaded"} />
      <section className="director_top layout single_video single_video-directors">
        <h2 className={`director_name light slide ${textAnimationClass} `}>
          {directorName}
        </h2>
      </section>
      <section className="director_bottom">
        <div>
          {proyectos.map((trabajo, index) => {
            return (
              <Link to={`/directors_videos/${id}_${index}`} key={index} >
                <TrabajoCardHome
                  isImmediateLoad={index > 1 ? false : true}
                  info={trabajo}
                  idVid={index}
                  idDir={id}
                  onAssetLoaded={assetLoaded}
                  margin="200px"
                />
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Directors;
