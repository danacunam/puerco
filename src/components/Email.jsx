const EmailIcon = (props) => {
    const emailAddress = 'hola@puerco.tv'; // Cambia esto por tu dirección de correo electrónico
  
    const copyToClipboard = () => {
      const textField = document.createElement('textarea');
      textField.innerText = emailAddress;
      document.body.appendChild(textField);
      textField.select();
  
      try {
        document.execCommand('copy');
        alert(`Email copiado al portapapeles: ${emailAddress}`);
      } catch (err) {
        console.error('No se pudo copiar al portapapeles: ', err);
      } finally {
        document.body.removeChild(textField);
      }
    };
  
    return (
        <img
        className="redes_sociales"
        src={
          props.clase === "service_nav"
            ? "../assets/misc/email_black.png"
            : "../assets/misc/email.png"
        }
        alt="email"
        onClick={copyToClipboard}
      />
    );
  };
  
  export default EmailIcon;