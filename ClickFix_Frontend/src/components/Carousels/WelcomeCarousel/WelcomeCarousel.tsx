import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './WelcomeCarousel.css';

const WelcomeCarousel = () => {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      fade
      controls={false}
      indicators={true}
      className="carousel-custom"
      interval={2000}
    >
      <Carousel.Item>
        <div className="carousel-slide text-center">
          <h3>Welcome to ClickFix</h3>
          <p>
            ClickFix is your one-stop solution for all home maintenance and repair needs.
            We connect you with trusted professionals at the click of a button.
          </p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-slide text-center">
          <h3>Why Choose Us?</h3>
          <p>
            We offer fast, reliable, and affordable services with verified professionals.
            Your satisfaction and safety are our top priorities.
          </p>
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-slide text-center">
          <h3>Book Now!</h3>
          <p>
          Book your service in seconds and let us handle the rest.
            <br />
            <br />
            <br />
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default WelcomeCarousel;
