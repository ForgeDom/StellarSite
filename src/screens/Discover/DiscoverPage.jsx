// src/screens/DiscoverPage/DiscoverPage.jsx
import styles from "../../assests/css/DiscoverPage/DiscoverPage.module.scss";

import DiscoverHero from "../Discover/DiscoverHero";
import DiscoverHandpicked from "../Discover/DiscoverHandpicked";
import DiscoverIceland from "../Discover/DiscoverIceland";
import DiscoverPicky from "../Discover/DiscoverPicky";
import DiscoverDestinations from "../Discover/DiscoverDestinations";

export default function DiscoverPage() {
  return (
    <div className={styles.page}>
      <DiscoverHero />
      <DiscoverHandpicked />
      <DiscoverIceland />
      <DiscoverPicky />
      <DiscoverDestinations />
    </div>
  );
}
