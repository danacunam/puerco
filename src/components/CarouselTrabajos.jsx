import { useEffect, useState } from "react";

const CarouselTrabajos = (props) => {
  const { img } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % img.length);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={`../assets/${img[currentIndex]}`}
      alt="image"
      className="trabajo_card_home-portada playing"
    />
  );
};

export default CarouselTrabajos;
