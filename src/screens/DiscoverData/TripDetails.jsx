import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tripsData } from "../../mock/tripsData";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../scripts/supabaseClient";
import styles from "../../assests/css/DiscoverData/TripDetails.module.scss";
import FlightModal from "../DiscoverData/FlightModal";

export default function TripDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // 2. Стан для керування модальним вікном
    const [showFlights, setShowFlights] = useState(false);

    // Знаходимо подорож
    const trip = tripsData.find((t) => t.id === parseInt(id));

    if (!trip) return <div className={styles.notFound}>Trip not found</div>;

    // 3. Обробник кліку "Book Now"
    const handleBookClick = () => {
        // Перевірка авторизації
        if (!user) {
            alert("Please log in to book this trip!");
            navigate("/auth/login");
            return;
        }

        // Якщо користувач увійшов — відкриваємо модалку
        setShowFlights(true);
    };

    return (
        <div className={styles.detailsPage}>

            {/* ЛІВА ЧАСТИНА: Картинка */}
            <div className={styles.leftSide} style={{ backgroundImage: `url(${trip.image})` }}>
                <button className={styles.videoBtn}>
                    <div className={styles.playIcon}>
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                            <path d="M11 7L1 13L1 1L11 7Z" fill="white" />
                        </svg>
                    </div>
                    <span>Watch the video</span>
                </button>
            </div>

            {/* ПРАВА ЧАСТИНА: Контент */}
            <div className={styles.rightSide}>

                {/* Кнопка Закрити -> повертає на Discover */}
                <button className={styles.closeBtn} onClick={() => navigate("/discoverData")}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.contentContainer}>
                    <h1 className={styles.title}>{trip.title}</h1>

                    <div className={styles.subInfo}>
                        <div className={styles.locationBlock}>
                            <span className={styles.subLabel}>Destination</span>
                            <span className={styles.location}>{trip.location}</span>
                        </div>

                        <div className={styles.weatherBlock}>
                            <span className={styles.temp}>-16 °C</span>
                            <span className={styles.weather}>Very cold</span>
                        </div>
                    </div>

                    <div className={styles.bookingSection}>
                        <p className={styles.priceLabel}>Get your ticket for the<br />lowest price.</p>
                        
                        {/* Кнопка відкриває модалку */}
                        <button
                            className={styles.bookBtn}
                            onClick={handleBookClick}
                        >
                            Book Now
                        </button>
                    </div>

                    <div className={styles.description}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                            At vero eos et accusam et justo duo dolores et ea rebum.
                        </p>
                        <p>
                            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. Відображення модального вікна */}
            {showFlights && (
                <FlightModal
                    trip={trip}
                    onClose={() => setShowFlights(false)}
                />
            )}
        </div>
    );
}