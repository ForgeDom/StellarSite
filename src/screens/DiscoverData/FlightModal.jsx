import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assests/css/DiscoverData/FlightModal.module.scss";
import { flightsMock } from "../../mock/flightsMock"; 
import { useAuth } from "../../context/AuthContext";

// Імпорт іконок авіаліній
import icon1 from "../../assests/img/FlightsPage/icon1.png";
import icon2 from "../../assests/img/FlightsPage/icon2.png";
import icon3 from "../../assests/img/FlightsPage/icon3.png";
const airlineIcons = [icon1, icon2, icon3];

export default function FlightModal({ trip, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // === 1. ЛОГІКА ФІЛЬТРАЦІЇ ===
  // Шукаємо рейси, які відповідають країні/місту подорожі
  const relevantFlights = flightsMock.filter(flight => 
    trip.location.includes(flight.destination)
  );

  const flightsToShow = relevantFlights.length > 0 ? relevantFlights : [];

  // === 2. ОБРОБНИК НАТИСКАННЯ "BOOK" ===
  const handleProceedToPayment = (flight) => {
    // Перевірка авторизації
    if (!user) {
      alert("Please log in to book!");
      navigate("/auth/login");
      return;
    }

    // Переходимо на сторінку оплати (/payment)
    // Передаємо через state: 
    // 1. flight (обраний рейс)
    // 2. trip (дані про подорож: картинка, назва, локація)
    navigate("/payment", { 
        state: { 
            flight: flight,
            trip: trip 
        } 
    });
  };

  return (
    <div className={styles.overlay}>
      
      {/* Кнопка "Назад" */}
      <button className={styles.backBtnCircle} onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M19 12H5M12 19L5 12L12 5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className={styles.modalContainer}>
        
        {/* Кнопка закриття (хрестик) */}
        <button className={styles.closeBtnBlack} onClick={onClose}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
             </svg>
        </button>

        {/* HEADER: Інформація про пункт призначення */}
        <div className={styles.headerRow}>
            <div className={styles.routeGroup}>
                <div className={styles.cityBlock}>
                    <span className={styles.label}>Destination</span>
                    <h2 className={styles.city}>{trip.location}</h2>
                </div>
            </div>
        </div>

        {/* LIST: Список рейсів */}
        <div className={styles.listContainer}>
            {flightsToShow.length === 0 ? (
                <div style={{textAlign: 'center', marginTop: '50px', color: '#999'}}>
                    <h3>No direct flights found for this location.</h3>
                    <p>Try searching manually on the Flights page.</p>
                </div>
            ) : (
                flightsToShow.map((flight, index) => (
                    <div key={flight.id} className={styles.flightRow}>
                        
                        {/* Авіакомпанія */}
                        <div className={styles.airlineCol}>
                            <img src={airlineIcons[index % 3]} alt={flight.airline} className={styles.logo} />
                            <span className={styles.airlineName}>{flight.airline}</span>
                        </div>

                        {/* Час та тривалість */}
                        <div className={styles.scheduleCol}>
                            <span className={styles.time}>{flight.depart}</span>
                            <div className={styles.duration}>
                                <div className={styles.line}>
                                    <span className={styles.dot}></span>
                                    <span className={styles.stopInfo}>{flight.stops}</span>
                                    <span className={styles.dot}></span>
                                </div>
                                <span className={styles.durationText}>{flight.duration}</span>
                            </div>
                            <span className={styles.time}>{flight.arrival}</span>
                        </div>

                        {/* Ціна */}
                        <div className={styles.priceCol}>
                            <div className={styles.priceItem}>
                                <span className={styles.priceVal}>${flight.priceEconomy}</span>
                                <span className={styles.priceLabel}>Economy</span>
                            </div>
                        </div>

                        {/* КНОПКА BOOK -> Перехід на Payment */}
                        <button 
                            className={styles.bookBtn} 
                            onClick={() => handleProceedToPayment(flight)}
                        >
                            Book
                        </button>

                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  );
}