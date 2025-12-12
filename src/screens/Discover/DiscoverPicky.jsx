// src/components/Discover/DiscoverPicky.jsx
import styles from "../../assests/css/DiscoverPage/DiscoverPage.module.scss";
import { useNavigate } from "react-router-dom";
import card1 from "../../assests/img/DiscoverPage/pic3.png";
import card2 from "../../assests/img/DiscoverPage/pic4.png";

export default function DiscoverPicky() {
  const navigate = useNavigate();
  return (
    <section className={styles.picky}>
      <div className={styles.pickyTop}>
        <div className={styles.pickyTextBlock}>
          <h2>We did the hardwork,<br />you just be picky</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. At vero eos et.
          </p>
        </div>

        <div className={styles.smallCard}>
          <div className={styles.smallCardImg}>
            <img src={card1} alt="Bau Thai" />
          </div>
          <div className={styles.smallCardInfo}>
            <h3>Bau Thai</h3>
            <span className={styles.smallLocation}>North Europe, England</span>
            <div className={styles.smallPriceRow}>
              <span className={styles.smallPrice}>$300</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pickyBottom}>
        <div className={styles.smallCard}>
          <div className={styles.smallCardImg}>
            <img src={card2} alt="Bau Thai" />
          </div>
          <div className={styles.smallCardInfo}>
            <h3>Bau Thai</h3>
            <span className={styles.smallLocation}>North Europe, England</span>
            <div className={styles.smallPriceRow}>
              <span className={styles.smallPrice}>$300</span>
            </div>
          </div>
        </div>

        <div className={styles.pickyTextRight}>
          <h3>Choose what suits<br />you the most.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. At vero eos et.
          </p>
          <button className={styles.learnMoreBtn} onClick={() => navigate("/discoverData")}>Learn more</button>
        </div>
      </div>
    </section>
  );
}
