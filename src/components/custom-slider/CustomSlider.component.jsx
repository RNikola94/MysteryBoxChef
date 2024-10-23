import { useState, useEffect } from 'react';
import './custom-slider.styles.css'

const CustomSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <div className="slide-title">{slide.title}</div>
          </div>
        ))}
      </div>
      
      {/* Navigation buttons */}
      <button className="prev-button" onClick={prevSlide}>◀</button>
      <button className="next-button" onClick={nextSlide}>▶</button>

      {/* Slide Indicators */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
