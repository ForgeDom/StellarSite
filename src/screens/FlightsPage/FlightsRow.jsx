import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "../../assests/css/FlightsPage/FlightsPage.module.scss";
import clock from "../../assests/img/FlightsPage/clock.png";

export default function FlightRow({ flight }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Обробник кліку "Book Now"
    const handleBookClick = () => {
        // 1. Перевірка авторизації
        if (!user) {
            alert("Please log in to book a flight!");
            navigate("/auth/login");
            return;
        }

        // 2. Перехід на сторінку оплати з передачею даних рейсу
        navigate("/payment", { state: { flight } });
    };

    return (
        <div className={styles.row}>

            {/* Airline Logo & Name */}
            <div className={styles.airline}>
                <img src={flight.airlineLogo} alt={flight.airline} />
                <span>{flight.airline}</span>
            </div>

            {/* Departure Time */}
            <div className={styles.time}>{flight.depart}</div>

            {/* Stops & Duration */}
            <div className={styles.stopsBlock}>
                <div className={styles.stopsRow}>
                    <div className={styles.dotsRow}>
                        <span></span><span></span><span></span>
                    </div>
                    <div className={styles.stopsPill}>
                        {flight.stops}
                    </div>
                    <div className={styles.dotsRow}>
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <div className={styles.durationRow}>
                    <img src={clock} alt="time" />
                    <span>{flight.duration}</span>
                </div>
            </div>

            {/* Arrival Time */}
            <div className={styles.time}>{flight.arrival}</div>

            {/* Prices */}
            <div className={styles.price}>${flight.priceEconomy}</div>
            <div className={styles.price}>${flight.priceBusiness}</div>

            {/* Book Button -> To Payment Page */}
            <button 
                className={styles.bookBtn} 
                onClick={handleBookClick}
            >
                Book Now
            </button>

        </div>
    );
}