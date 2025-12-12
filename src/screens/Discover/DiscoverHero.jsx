// src/components/Discover/DiscoverHero.jsx
import styles from "../../assests/css/DiscoverPage/DiscoverPage.module.scss";
import heroImg from "../../assests/img/DiscoverPage/discover-bg.png";

export default function DiscoverHero() {
  return (
    <section id="discover-hero"
      className={styles.hero}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Discover the<br />furthest
        </h1>

        <p className={styles.heroText}>
          Wafer dessert danish. Powder toffee cookie jelly beans bear claw
          jelly-o gingerbread halvah. and
        </p>

        <button className={styles.heroPlayBtn}>
          <span className={styles.heroPlayIcon} />
          <span>Watch the video</span>
        </button>
      </div>
    </section>
  );
}
