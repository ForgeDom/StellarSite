import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assests/css/DiscoverData/DiscoverData.module.scss";
import { tripsData } from "../../mock/tripsData";

export default function Discover() {
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/trip/${id}`);
    };

    return (
        <div className={styles.pageContainer}>

            {/* HEADER SECTION */}
            <section className={styles.headerSection}>
                <h1 className={styles.mainTitle}>Discover</h1>
                <p className={styles.subtitle}>Places that you've never discovered.</p>
            </section>

            {/* GRID SECTION */}
            <section className={styles.gridContainer}>
                {tripsData.map((trip) => (
                    <div
                        key={trip.id}
                        className={styles.card}
                        // --- ВАЖЛИВО: Додаємо обробник кліку тут ---
                        onClick={() => handleCardClick(trip.id)}
                        // Додаємо курсор, щоб видно було, що можна клікати
                        style={{ cursor: 'pointer' }}
                    >
                        {/* Картинка */}
                        <div className={styles.imageWrapper}>
                            <img src={trip.image} alt={trip.title} loading="lazy" />
                        </div>

                        {/* Інформація */}
                        <div className={styles.cardContent}>
                            <div className={styles.rowTop}>
                                <h3 className={styles.cardTitle}>{trip.title}</h3>
                                <span className={styles.price}>${trip.price}</span>
                            </div>

                            <div className={styles.rowBottom}>
                                <div className={styles.locationInfo}>
                                    <p className={styles.location}>{trip.location}</p>

                                    {/* Зупиняємо спливання події (stopPropagation), 
                                        щоб при кліку на "сердечко" не відкривалася сторінка подорожі */}
                                    <button
                                        className={styles.favBtn}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Тут логіка додавання в улюблене
                                            console.log("Add to fav clicked");
                                        }}
                                    >
                                        <span>Add to fav</span>
                                        {/* SVG Heart Icon */}
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 14.5L1.5 7C-1.5 4 0.5 0.5 4.5 0.5C6.5 0.5 8 2 9 3C10 2 11.5 0.5 13.5 0.5C17.5 0.5 19.5 4 16.5 7L9 14.5Z" stroke="black" strokeWidth="1.2" />
                                        </svg>
                                    </button>
                                </div>

                                <span className={styles.priceLabel}>As low as</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* BOTTOM FILTER BAR */}
            <div className={styles.bottomBar}>
                <div className={styles.filtersLeft}>
                    <span className={styles.activeFilter}>Price</span>
                    <span>Distance</span>
                    <span>Country</span>
                    <span>Isolation</span>
                </div>

                <div className={styles.filtersRight}>
                    <span className={styles.activeFilterRed}>Featured</span>
                    <span>Popular</span>
                    <span>Trending</span>
                </div>
            </div>
        </div>
    );
}