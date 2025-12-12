import { useEffect } from "react";
import styles from "../../assests/css/LandingPage/LandingPage.module.scss";
import SectionHero from "../LandingPage/SectionHero";
import HeroCountries from "../LandingPage/HeroCountries";

export default function LandingPage() {
    

    return (
        <div className={styles.mainContainer}>

            <section id="hero" className={styles.section}>
                <SectionHero />
            </section>

            <section id="countries" className={styles.section}>
                <HeroCountries />
            </section>

        </div>
    );
}
