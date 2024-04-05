import { useContext, useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import DataContext from "../contexts/DataContext";

const ContactUs = () => {
  const { data } = useContext(DataContext);
  const [contactos, setContactos] = useState([]);
  useEffect(() => {
    if (data.contactos) {
      setContactos(data.contactos);
    }
  }, [data]);
  return (
    <section className="bottom_info">
      <h2 className="section_title light">CONTACT US</h2>
      <section className="contactos">
        {contactos.map((contacto) => {
          return (
            <ContactCard key={contactos.indexOf(contacto)} info={contacto} />
          );
        })}
      </section>
    </section>
  );
};

export default ContactUs;
