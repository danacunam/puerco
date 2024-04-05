import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Redes from "./Redes";
import DataContext from "../contexts/DataContext";
import AnimateContext from "../contexts/AnimationContext";

const Nav = (props) => {
  const { clase } = props;
  const { data } = useContext(DataContext);
  const [expand, setExpand] = useState(false);
  const [expandSub, setExpandSub] = useState(false);
  const [directores, setDirectores] = useState([]);
  const [subMenuHeight, setSubMenuHeight] = useState(0);
  const [longestName, setLongestName] = useState(20);

  const { AnimateDispatch } = useContext(AnimateContext);

  const showSubMenu = `
  @keyframes showSubMenu{
    0%{
      height:0;
    }
    100%{
      height:${subMenuHeight}px;
    }
  }`;
  useEffect(() => {
    if (data.directores) {
      setDirectores(data?.directores);
      setSubMenuHeight(data.directores.length * 52);
    }
  }, [data]);

  useEffect(() => {
    directores.forEach((director) => {
      // Obtén la longitud del nombre del director actual
      const longitudNombre = director.nombre.length;
      // Compara la longitud actual con la longitud máxima almacenada

      if (longitudNombre > longestName) {
        // Actualiza la longitud máxima si la longitud actual es mayor
        setLongestName(longitudNombre);
      }
    });
  }, [directores]);

  return (
    <nav className={`nav ${clase}`}>
      <Link to="/">
        <picture className={`main_logo ${expand ? "not-visible" : ""}`}>
          <source srcSet="../assets/puerco-logo.webp" type="image/webp" />
          <img src="../assets/puerco-logo.png" alt="logo de puerco" />
        </picture>
      </Link>
      {clase === "service_nav" ? (
        <img
          src={
            expand
              ? "../assets/misc/close_menu.png"
              : "../assets/misc/open_mob-black.png"
          }
          alt="button"
          className="mobile_button"
          onClick={() => {
            setExpand(!expand);
            setExpandSub(false);
          }}
        />
      ) : (
        <img
          src={
            expand
              ? "../assets/misc/close_menu.png"
              : "../assets/misc/open_mob.png"
          }
          alt="button"
          className="mobile_button"
          onClick={() => {
            setExpand(!expand);
            setExpandSub(false);
          }}
        />
      )}

      <ul className="site_navigation ">
        <li>
          <Link className="bold" to="/service">
            Production Service
          </Link>
        </li>
        <li className="bold">
          DIRECTORS
          {directores.length > 0 && (
            <ul
              className="submenu"
              style={{
                width: longestName * 11.5,
                top: -directores.length * 60,
              }}
            >
              {directores.map((director) => {
                return (
                  <li key={director.director_id}>
                    <Link
                      className="sub_link"
                      onClick={() => AnimateDispatch({ type: "SHOW" })}
                      to={`/directors/${director.director_id}`}
                    >
                      {director.nombre}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
        <li>
          <Link className="bold" to="/brutal">
            Brutal
          </Link>
        </li>
        <li>
          <Link className="bold" to="/about">
            Contact
          </Link>
        </li>
      </ul>
      {/* NAV MOBILE */}
      <ul
        className={`${
          expand
            ? "site_navigation_mobile-expanded fade-in"
            : "site_navigation_mobile"
        } `}
      >
        <li>
          <Link className="bold" to="/">
            Home
          </Link>
        </li>

        <li>
          <Link className="bold" to="/service">
            Production Service
          </Link>
        </li>
        <li className="bold" onClick={() => setExpandSub(!expandSub)}>
          DIRECTORS
        </li>

        <ul
          className={`submenu_mobile`}
          style={{
            height: `${!expandSub ? "0px" : `${subMenuHeight}px`}`,
            padding: `${!expandSub ? "0px" : "0 0 20px 0px"}`,
          }}
        >
          {directores.map((director) => {
            return (
              <li key={director.director_id}>
                <Link
                  className="sub_link"
                  to={`/directors/${director.director_id}`}
                  onClick={() => {
                    setExpand(false);
                    AnimateDispatch({ type: "SHOW" });
                  }}
                >
                  {director.nombre}
                </Link>
              </li>
            );
          })}
        </ul>

        <li>
          <Link className="bold" to="/brutal">
            Brutal
          </Link>
        </li>
        <li>
          <Link className="bold" to="/about">
            Contact us
          </Link>
        </li>
      </ul>
      <Redes clase={clase} />
    </nav>
  );
};

export default Nav;
