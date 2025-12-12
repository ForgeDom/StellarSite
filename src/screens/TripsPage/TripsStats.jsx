import styles from "../../assests/css/TripsPage/TripsPage.module.scss";
import { useNavigate } from "react-router-dom";

export default function DiscoverStats({ stats }) {
  const navigate = useNavigate();
  return (
    <section className={styles.statsSection}>
      <div>
        <h4>Statistics</h4>
        <p>{stats.description}</p>
      </div>

      <div>
        <h4>Coverage kms</h4>
        <h2>{stats.coverage}</h2>
      </div>

      <div>
        <h4>Flights per day</h4>
        <h2>{stats.flightsPerDay}</h2>
      </div>

      <div>
        <h4>Next flight</h4>
        <h2>{stats.nextFlight}</h2>
      </div>

      <button className={styles.bookBtn} onClick={() => {
        navigate("/discoverData");
      }}>Book Now</button>
    </section>
  );
}
