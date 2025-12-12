// src/components/Discover/DiscoverHandpicked.jsx
import styles from "../../assests/css/DiscoverPage/DiscoverPage.module.scss";

import topTour1 from "../../assests/img/DiscoverPage/pic1.png";
import topTour2 from "../../assests/img/DiscoverPage/pic2.png";

export default function DiscoverHandpicked() {
  return (
    <section id="handpicked" className={styles.handpicked}>
      {/* Верхній блок */}
      <div className={styles.handpickedTop}>
        <div className={styles.handpickedTextBlock}>
          <h2>Hand picked tours<br />for your</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. At vero eos et.
          </p>
        </div>

        <div className={styles.tourCard}>
          <div className={styles.tourImageWrapper}>
            <img src={topTour1} alt="Blue River" />
          </div>
          <div className={styles.tourInfo}>
            <div>
              <h3>Blue River</h3>
              <span className={styles.tourLocation}>North Lake, Iceland</span>
            </div>
            <div className={styles.tourPriceBlock}>
              <span className={styles.tourPrice}>$329</span>
              <span className={styles.tourSub}>As low as</span>
            </div>
          </div>
          <div className={styles.tourMeta}>
            <button className={styles.tourFav}>♡</button>
          </div>
        </div>
      </div>

      {/* Нижній блок */}
      <div className={styles.handpickedBottom}>
        <div className={styles.tourCard}>
          <div className={styles.tourImageWrapper}>
            <img src={topTour2} alt="Great Reefs" />
          </div>
          <div className={styles.tourInfo}>
            <div>
              <h3>Great Reefs</h3>
              <span className={styles.tourLocation}>North Lake, Iceland</span>
            </div>
            <div className={styles.tourPriceBlock}>
              <span className={styles.tourPrice}>$169</span>
              <span className={styles.tourSub}>As low as</span>
            </div>
          </div>
          <div className={styles.tourMeta}>
            <button className={styles.tourFav}>♡</button>
          </div>
        </div>

        <div className={styles.handpickedTextBlockRight}>
          <h3>Choose what suits<br />you the most.</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. At vero eos et.
          </p>
        </div>
      </div>
    </section>
  );
}
