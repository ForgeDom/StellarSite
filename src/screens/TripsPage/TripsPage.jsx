import DiscoverSlider from "./TripsSlider";
import DiscoverHero from "./TripsHero";
import styles from "../../assests/css/TripsPage/TripsPage.module.scss";

export default function TripsPage() {
  return (
    <div className={styles.page}>
      <DiscoverSlider>
        {({ current, next, prev }) => (
          // Передаємо stats всередину Hero, щоб відрендерити їх поверх картинки
          <DiscoverHero 
            data={current} 
            next={next} 
            prev={prev} 
            stats={current.stats} 
          />
        )}
      </DiscoverSlider>
    </div>
  );
}