import styles from "../../assests/css/TripsPage/TripsPage.module.scss";
import { useNavigate } from "react-router-dom";

export default function DiscoverHero({ data, next, prev, stats }) {
  const navigate = useNavigate();
  return (
    <section 
      key={data.id} 
      id="trips-hero" // ЦЕЙ ID ПОТРІБЕН ДЛЯ ПРОЗОРОГО ХЕДЕРА
      className={styles.hero}
      style={{ backgroundImage: `url(${data.img})` }}
    >
      {/* Основний контент (по центру/зліва) */}
      <div className={styles.heroContent}>
        <h1>{data.title}</h1>
        
        {/* Блок з описом і погодою */}
        <div className={styles.infoRow}>
            <div className={styles.locationBlock}>
                <p className={styles.subtitle}>The North Lake</p>
                <p className={styles.place}>{data.place}</p>
            </div>
            
            <div className={styles.weather}>
                <span>{data.temperature}</span>
                <span>{data.weather}</span>
            </div>
        </div>

        {/* Стрілки навігації */}
        <div className={styles.navButtons}>
          <button onClick={prev} className={styles.arrowBtn}>←</button>
          <button onClick={next} className={styles.arrowBtn}>→</button>
        </div>
      </div>

      {/* Нижня панель (Статистика + Кнопки дій) */}
      <div className={styles.bottomBar}>
        
        {/* Статистика (зліва) */}
        <div className={styles.statsContainer}>
            <div className={styles.statItem}>
                <h4>Statistics</h4>
                <p>{stats.description}</p>
            </div>
            <div className={styles.statItem}>
                <h4>Coverage kms</h4>
                <h2>{stats.coverage}</h2>
            </div>
            <div className={styles.statItem}>
                <h4>Flights per day</h4>
                <h2>{stats.flightsPerDay}</h2>
            </div>
            <div className={styles.statItem}>
                <h4>Next flight</h4>
                <h2>{stats.nextFlight}</h2>
            </div>
        </div>

        {/* Кнопки дій (справа) */}
        <div className={styles.actionButtons}>
            <button className={styles.watchVideoBtn}>
                <span className={styles.playIcon}>▶</span>
                Watch the video
            </button>
            <button className={styles.moreInfoBtn} onClick={() =>navigate("/discoverData")}>
                More Info
            </button>
        </div>
      </div>
    </section>
  );
}