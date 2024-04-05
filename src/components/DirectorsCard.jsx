const DirectorsCard = (props) => {
  const { nombre, cargo, img_url } = props.data;
  return (
    <section className="director_card">
      <img src={`../assets/${img_url}`} className="director_card-picture"alt="nombre" />
      <h2 className="director_card-name bold">{nombre}</h2>
      <h3 className="director_card-cargo">{cargo}</h3>
    </section>
  );
};

export default DirectorsCard;
