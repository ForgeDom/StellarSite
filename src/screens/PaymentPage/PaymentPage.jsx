// src/components/Payment/PaymentPage.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../scripts/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import styles from "../../assests/css/PaymentPage/PaymentPage.module.scss";

// Логотипи (залиште ваші посилання)
const visaLogo = "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg";
const paypalLogo = "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg";
const stripeLogo = "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg";
const gpayLogo = "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg";

export default function PaymentPage() {
    const { state } = useLocation(); // Отримуємо передані дані
    const navigate = useNavigate();
    const { user } = useAuth();

    const [loading, setLoading] = useState(false);

    // Витягуємо дані. Якщо зайшли напряму без вибору - flight буде undefined
    const flight = state?.flight;
    const trip = state?.trip; // Може бути undefined, якщо прийшли з FlightsPage

    // Якщо немає рейсу, повертаємо назад
    if (!flight) {
        return (
            <div style={{ padding: "100px", textAlign: "center" }}>
                <h2>No flight selected</h2>
                <button onClick={() => navigate("/flights")} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
                    Go to Flights
                </button>
            </div>
        );
    }

    // Розрахунок
    const ticketPrice = flight.priceEconomy || flight.price || 0;
    const taxes = 40;
    const serviceCharge = 10;
    const total = ticketPrice + taxes + serviceCharge;

    // --- ФУНКЦІЯ ОПЛАТИ (ЗАПИС В БАЗУ) ---
    const handleCheckOut = async () => {
        if (!user) return alert("Please login first"); // Перевірка юзера
        setLoading(true);

        try {
            // 1. Готуємо дані (перевіряємо, щоб не було undefined)
            const destCity = trip?.location || flight.destination || "Unknown Destination";
            const originCity = flight.origin || "Unknown Origin";
            const airlineName = flight.airline || "Unknown Airline";
            // Якщо дати немає - беремо сьогоднішню
            const flightDate = flight.date ? flight.date : new Date().toISOString();

            console.log("Sending to Supabase:", {
                user_id: user.id,
                origin_city: originCity,
                destination_city: destCity,
                flight_date: flightDate,
                price: total,
                status: 'confirmed',
                airline: airlineName
            });

            // 2. Записуємо в Supabase
            const { error } = await supabase.from('bookings').insert({
                user_id: user.id,
                origin_city: originCity,
                destination_city: destCity,
                flight_date: flightDate,
                price: total,
                status: 'confirmed',
                airline: airlineName // Переконайтесь, що в таблиці 'bookings' є колонка 'airline'
            });

            if (error) {
                // Виводимо точну помилку від Supabase в консоль
                console.error("Supabase Error Details:", error.message, error.details);
                throw error;
            }

            // 3. Успіх
            alert("Payment successful! Your trip is booked.");
            navigate("/trips");

        } catch (error) {
            console.error("Booking error:", error);
            alert(`Payment failed: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>

            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>←</button>
                <h1>Payment options</h1>
            </div>

            <div className={styles.contentContainer}>

                {/* ЛІВА ЧАСТИНА (Методи оплати) */}
                <div className={styles.formSection}>
                    <h2>Payment method</h2>

                    <div className={styles.methodsRow}>
                        <div className={styles.methodCard}><img src={paypalLogo} alt="PayPal" style={{ height: 20 }} /></div>
                        <div className={styles.methodCard}><img src={stripeLogo} alt="Stripe" style={{ height: 25 }} /></div>
                        <div className={`${styles.methodCard} ${styles.active}`}><img src={visaLogo} alt="Visa" style={{ height: 15 }} /></div>
                        <div className={styles.methodCard}><img src={gpayLogo} alt="GPay" style={{ height: 20 }} /></div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.field}>
                            <label>Cardholder Name</label>
                            <input type="text" defaultValue={user?.user_metadata?.full_name || "Lex Shah"} />
                        </div>
                        <div className={styles.field}>
                            <label>Expiry</label>
                            <div className={styles.dateInput}>
                                <input type="text" defaultValue="16 / 02" />
                                <span>▼</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.field}>
                            <label>Card Number</label>
                            <div className={styles.cardInput}>
                                <span>💳</span>
                                <input type="text" defaultValue="•••• •••• •••• 6732" />
                            </div>
                        </div>
                        <div className={styles.field}>
                            <label>CVV</label>
                            <input type="password" defaultValue="•••" />
                        </div>
                    </div>

                    <div className={styles.terms}>
                        <input type="checkbox" id="terms" defaultChecked />
                        <label htmlFor="terms">I accept the terms and conditions</label>
                    </div>
                </div>

                {/* ПРАВА ЧАСТИНА (Інформація про замовлення) */}
                <div className={styles.summarySection}>
                    <h2>Booking summary</h2>

                    {/* Якщо є інформація про подорож (картинка) */}
                    {trip && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "1.1rem", marginBottom: "5px" }}>{trip.title}</h3>
                            <p style={{ fontSize: "0.9rem", color: "#ccc" }}>{trip.location}</p>
                        </div>
                    )}

                    <div className={styles.summaryRow}>
                        <span>{flight.airline} Flight ({flight.origin} → {flight.destination})</span>
                        <span>${ticketPrice}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Taxes and fees</span>
                        <span>${taxes}</span>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>${ticketPrice + taxes}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Service charges</span>
                        <span>${serviceCharge}</span>
                    </div>

                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span className={styles.totalPrice}>${total}</span>
                    </div>

                    <button
                        className={styles.checkoutBtn}
                        onClick={handleCheckOut} // Викликаємо функцію оплати
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Check Out"}
                    </button>
                </div>

            </div>
        </div>
    );
}