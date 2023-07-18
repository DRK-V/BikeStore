import React, { useState, useEffect } from 'react';
import '../css/carousel.css';

const images = [
  {
    imageUrl: 'https://www.incolmotos-yamaha.com.co/bicicletas/images/civante.png',
    discount: '20% Off ',
  },
  {
    imageUrl: 'https://www.classbike.co/wp-content/uploads/2022/10/Elite-blue.png',
    discount: '10% Off',
  },
  {
    imageUrl: 'https://rambikes.cl/wp-content/uploads/2021/09/16ramtrx-hyd-aro29m16-min.png',
    discount: '15% Off ',
  },
 
  // Agrega más imágenes y descuentos necesario
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]); // Agregamos 'activeIndex' como dependencia para el useEffect

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {images.map((imageInfo, index) => (
          <div
            key={index}
            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            style={{
              marginLeft: `${index === 0 ? -activeIndex * 100 : 0}%`,
            }}
          >
            <div className="image-container">
              <img src={imageInfo.imageUrl} alt={`Image ${index + 1}`} />
              <div className="discount">{imageInfo.discount}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goToImage(index)} // Usamos goToImage en lugar de setActiveIndex
          />
        ))}
      </div>
      <button onClick={prevImage} className="carousel-button prev-button">&#10094;</button>
      <button onClick={nextImage} className="carousel-button next-button">&#10095;</button>
    </div>
  );
};

export default Carousel;






















