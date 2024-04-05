import { Link } from "react-router-dom";
import EmailIcon from "./Email";

const Redes = (props) => {
  const { clase } = props;
  return (
    <ul className="redes">
      <li>
        <Link to="https://vimeo.com/puercoproductioncompany" target="_blank">
          <img
            className="redes_sociales"
            src={
              clase === "service_nav"
                ? "../assets/misc/vimeo_black.png"
                : "../assets/misc/vimeo.png"
            }
            alt="logo vimeo"
          />
        </Link>
      </li>
      <li>
        <EmailIcon clase={clase} />
      </li>
      <li>
        <Link to="https://www.instagram.com/puerco.tv/" target="_blank">
          <img
            className="redes_sociales"
            src={
              clase === "service_nav"
                ? "../assets/misc/ig_black.png"
                : "../assets/misc/ig.png"
            }
            alt="logo ig"
          />
        </Link>
      </li>
    </ul>
  );
};

export default Redes;
