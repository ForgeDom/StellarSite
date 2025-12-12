// src/components/Discover/DiscoverDestinations.jsx
import styles from "../../assests/css/DiscoverPage/DiscoverPage.module.scss";

export default function DiscoverDestinations() {
  return (
    <section className={styles.destinations}>
      <div className={styles.destinationsGrid}>
        <div>
          <h4>Europe</h4>
          <p>Sweden</p>
          <p>Stockholm</p>
          <p>Oslo</p>
          <p>Helsinki</p>
        </div>
        <div>
          <h4>Asia</h4>
          <p>Malaysia</p>
          <p>Tokyo</p>
          <p>Osaka</p>
          <p>Seoul</p>
        </div>
        <div>
          <h4>Africa</h4>
          <p>Senegal</p>
          <p>Cairo</p>
          <p>Accra</p>
        </div>
        <div>
          <h4>America</h4>
          <p>New York</p>
          <p>Miami</p>
          <p>Los Angeles</p>
        </div>
        <div>
          <h4>Australia</h4>
          <p>Sydney</p>
          <p>Melbourne</p>
        </div>
        <div>
          <h4>Top destinations</h4>
          <p>Maldives</p>
          <p>Bali</p>
          <p>Phuket</p>
        </div>
      </div>

      <div className={styles.bottomLine}>
        <h2>We go around the world.</h2>
        <span className={styles.bottomNote}>
          You travel just 2 hours away from home
        </span>
      </div>
    </section>
  );
}
