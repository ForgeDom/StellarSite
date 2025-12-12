import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assests/css/LandingPage/HeroCountries.module.scss";

import greeceImg from "../../assests/img/LandingPage/landing-gresce.png";
import indiaImg from "../../assests/img/LandingPage/landing-india.png";
import arrowLeft from "../../assests/img/LandingPage/arrow-left.png";
import arrowRight from "../../assests/img/LandingPage/arrow-right.png";

const slides = [
  { title: "Greece", img: greeceImg },
  { title: "India", img: indiaImg },
];

export default function HeroCountries() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const goToNext = () => {
    if (index === slides.length - 1) return; 
    setDirection("next");
    setIndex(index + 1);
  };

  const goToPrev = () => {
    if (index === 0) return; 
    setDirection("prev");
    setIndex(index - 1);
  };

  const getSlidePos = (i) => {
    if (i === index) return styles.active;

    if (i < index) {
      // всі попередні — ліворуч
      return styles.prevSlide;
    }

    // всі наступні — праворуч
    return styles.nextSlide;
  };

  return (
    <div className={styles.countrySection}>
      <div className={styles.slidesWrapper}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.slide} ${getSlidePos(i)}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          />
        ))}
      </div>

      <div className={styles.countryContent}>
        <h1 className={styles.countryTitle}>{slides[index].title}</h1>

        <button className={styles.discoverBtn} onClick={() => navigate("/discoverData")}>Discover</button>

        <div className={styles.arrows}>
          <button
            className={styles.arrowBtn}
            onClick={goToPrev}
            style={{ opacity: index === 0 ? 0.4 : 1 }}
          >
            <img src={arrowLeft} />
          </button>

          <button
            className={styles.arrowBtn}
            onClick={goToNext}
            style={{ opacity: index === slides.length - 1 ? 0.4 : 1 }}
          >
            <img src={arrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
