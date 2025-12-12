import styles from "../../assests/css/LandingPage/SectionHero.module.scss";
import heroImg from "../../assests/img/LandingPage/landing-bg.png"; 

export default function SectionHero() {
  return (
    <div 
      className={styles.hero}
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.smallText}>
          Wafer dessert danish. Powder toffee cookie jelly beans bear claw jelly 
          gingerbread halvah. and
        </p>

        <h1 className={styles.title}>
          Go places you’ve<br/>dreamed of.
        </h1>

        <button className={styles.playBtn}>
          <div className={styles.playIcon} />
          <span>Watch the video</span>
        </button>
      </div>
    </div>
  );
}
