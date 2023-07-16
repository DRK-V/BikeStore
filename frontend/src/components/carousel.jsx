import React, { useState, useEffect } from 'react';
import '../css/carousel.css';

const Carousel = () => {
 

  const slides = [
    'https://www.sena.edu.co/es-co/sena/PublishingImages/regionales.jpg',
    'https://www.sena.edu.co/es-co/sena/PublishingImages/regionales.jpg',
    'https://www.sena.edu.co/es-co/sena/PublishingImages/regionales.jpg',
    // Agrega más imágenes según sea necesario
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Cambiar imagen cada 3 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <div className="slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="prev-btn">{"<"}</button>
      <button onClick={nextSlide} className="next-btn">{">"}</button>
    </div>
  );
};

export default Carousel;














