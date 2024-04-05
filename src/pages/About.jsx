import { useContext, useEffect, useState } from "react";
import ContactUs from "../components/ContactUs";
import DirectorsCard from "../components/DirectorsCard";
import Nav from "../components/Nav";
import DataContext from "../contexts/DataContext";
import JoinUs from "../components/JoinUs";

const About = () => {
  const { data } = useContext(DataContext);
  const [team, setTeam] = useState([]);
  const [texto, setTexto] = useState({ p_1: "", p_2: "", p_1m: "", p2_m: "" });

  useEffect(() => {
    if (data?.team?.length > 0) {
      setTeam(data.team);
    }
    if (data.about) {
      setTexto({
        p_1: data.about[0].p_1,
        p_2: data.about[0].p_2,
        p_1m: data.about[0].p_1m,
        p_2m: data.about[0].p_2m,
      });
    }
  }, [data]);

  return (
    <>
      <Nav />
      <section className="layout layout_fr about">
        <section className="about_top">
          <p
            className="info info_desktop"
            dangerouslySetInnerHTML={{ __html: texto.p_1 }}
          ></p>
          <p
            className="info info_desktop"
            dangerouslySetInnerHTML={{ __html: texto.p_2 }}
          ></p>
          <p
            className="info info_mobile"
            dangerouslySetInnerHTML={{ __html: texto.p_1m }}
          ></p>
          <p
            className="info info_mobile"
            dangerouslySetInnerHTML={{ __html: texto.p_2m }}
          ></p>
        </section>
        <section className="about_mid">
          <section className="about_directors">
            {team.map((teamMember) => {
              return <DirectorsCard data={teamMember} key={teamMember.id} />;
            })}
          </section>{" "}
        </section>

        <section className="about_bottom">
          <img className="arrow" src="../assets/misc/arrow.png" alt="flecha" />
          <ContactUs />
          <JoinUs />
        </section>
      </section>
    </>
  );
};

export default About;
