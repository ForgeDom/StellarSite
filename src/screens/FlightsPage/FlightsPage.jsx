import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../scripts/supabaseClient";
import styles from "../../assests/css/FlightsPage/FlightsPage.module.scss";

// Імпортуємо мокові дані
import { flightsMock } from "../../mock/flightsMock";
import FlightRow from "../FlightsPage/FlightsRow";

// Імпорт іконок
import icon1 from "../../assests/img/FlightsPage/icon1.png";
import icon2 from "../../assests/img/FlightsPage/icon2.png";
import icon3 from "../../assests/img/FlightsPage/icon3.png";
import planeIMG from "../../assests/img/FlightsPage/plane.png";
const airlineIcons = [icon1, icon2, icon3];

// Додаємо логотипи до даних
const flightsWithLogos = flightsMock.map((flight, index) => ({
    ...flight,
    airlineLogo: airlineIcons[index % airlineIcons.length]
}));

export default function FlightsPage() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);

    // Стан для керування видимістю списку бронювань
    const [isBookingsOpen, setIsBookingsOpen] = useState(false);

    // 1. Завантажуємо куплені квитки з бази
    useEffect(() => {
        if (!user) return;

        const fetchBookings = async () => {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (data) setBookings(data);
            if (error) console.error("Error fetching bookings:", error);
        };
        fetchBookings();
    }, [user]);

    return (
        <div className={styles.pageWrapper}>

            <h1 className={styles.title}>Let's plan your trip</h1>

            {/* === БЛОК БРОНЮВАНЬ (Collapsible) === */}
            {bookings.length > 0 && (
                <>
                    {/* КНОПКА ВІДКРИТТЯ (Показується, коли список згорнутий) */}
                    {!isBookingsOpen && (
                        <button
                            className={styles.floatingBookingsBtn}
                            onClick={() => setIsBookingsOpen(true)}
                            title="View my bookings"
                        >
                            <span className={styles.btnIcon}>
                                <img src={planeIMG} alt="Plane Icon" />
                            </span>
                            <span className={styles.btnCount}>{bookings.length}</span>
                        </button>
                    )}

                    {/* ПОВНИЙ СПИСОК (Показується, коли розгорнутий) */}
                    {isBookingsOpen && (
                        <div className={styles.myBookingsOverlay}>
                            <div className={styles.overlayHeader}>
                                <h3 className={styles.bookingsTitle}>My Booked Flights</h3>
                                <button className={styles.closeOverlayBtn} onClick={() => setIsBookingsOpen(false)}>
                                    ✖
                                </button>
                            </div>

                            <div className={styles.bookingList}>
                                {bookings.map((item) => (
                                    <div key={item.id} className={styles.bookingCard}>
                                        <div className={styles.ticketIcon}>
                                            <img src={planeIMG} alt="Plane Icon" />
                                        </div>
                                        <div className={styles.ticketInfo}>
                                            <span className={styles.ticketDest}>{item.destination_city}</span>
                                            <span className={styles.ticketRoute}>
                                                {item.airline || "Airline"} • {item.origin_city}
                                            </span>
                                            <span className={styles.ticketDate}>
                                                {new Date(item.flight_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className={styles.ticketPrice}>${item.price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* === ОСНОВНА ТАБЛИЦЯ РЕЙСІВ === */}
            <div className={styles.card}>
                <div className={styles.table}>
                    <div className={styles.headerRow}>
                        <p>Airline</p>
                        <p>Departure</p>
                        <p>Stops</p>
                        <p>Arrival</p>
                        <p>Economy</p>
                        <p>Business</p>
                        <p></p>
                    </div>

                    {flightsWithLogos.map(f => (
                        <FlightRow key={f.id} flight={f} />
                    ))}
                </div>
            </div>
        </div>
    );
}