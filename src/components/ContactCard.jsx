
const ContactCard = (props) => {
  const { ubicacion, cargo, email, telf, nombre } = props.info;
  return (
    <section className="contact_card">
      <h3 className="ubicacion bold">{ubicacion}</h3>
      <h4 className="nombre bold">{nombre}</h4>
      <h4 className="cargo light">{cargo}</h4>
      <h3 className="email light">
        <span className="bold">{email}</span>@puerco.tv<br></br>
        {telf}
      </h3>
    </section>
  );
};

export default ContactCard;
