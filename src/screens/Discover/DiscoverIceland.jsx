// src/components/Discover/DiscoverIceland.jsx
import styles from "../../assests/css/DiscoverPage/DiscoverPage.module.scss";
import icelandImg from "../../assests/img/DiscoverPage/iceland.png";

export default function DiscoverIceland() {
  return (
    <section
      className={styles.icelandHero}
      style={{ backgroundImage: `url(${icelandImg})` }}
    >
      {/* 1. Основний контент (Заголовок, стрілки, опис) */}
      <div className={styles.icelandContent}>
        <h2>Iceland</h2>

        <div className={styles.icelandArrows}>
          <button className={styles.circleBtn}>←</button>
          <button className={styles.circleBtn}>→</button>
        </div>

        <p className={styles.icelandSubtitle}>
          We curate the best places to<br />stay around the world
        </p>
      </div>

      {/* 2. ✅ ВИНИСЛИ ЦЕЙ БЛОК НАЗОВНІ (тепер він прямий нащадок icelandHero) */}
      <div className={styles.icelandSmall}>
        <span>The North Lake</span>
        <span>Iceland</span>
      </div>
    </section>
  );
}