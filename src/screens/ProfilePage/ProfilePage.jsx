import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../scripts/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import styles from "../../assests/css/ProfilePage/ProfilePage.module.scss"; 

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Стан для завантаження аватарки
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Отримуємо ім'я
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Traveler";

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    // Встановлюємо поточну аватарку, якщо є
    if (user?.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
    }

    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('flight_date', { ascending: true });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, navigate]);

  // --- ЛОГІКА ЗАВАНТАЖЕННЯ АВАТАРКИ ---
  const handleAvatarUpload = async (event) => {
    try {
        setUploading(true);
        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.');
        }

        const file = event.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        // 1. Завантажуємо в Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Отримуємо публічне посилання
        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;

        // 3. Оновлюємо профіль користувача (metadata)
        const { error: updateUserError } = await supabase.auth.updateUser({
            data: { avatar_url: publicUrl }
        });

        if (updateUserError) throw updateUserError;

        // 4. Оновлюємо локальний стан
        setAvatarUrl(publicUrl);
        alert("Avatar updated!");
        
        // Перезавантажуємо сторінку, щоб хедер теж оновився (найпростіший спосіб)
        window.location.reload();

    } catch (error) {
        alert(error.message);
    } finally {
        setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.container}>
        
        {/* ЛІВА КОЛОНКА - ІНФО ПРО ЮЗЕРА */}
        <aside className={styles.sidebar}>
          <div className={styles.userInfo}>
            
            {/* Обгортка для аватарки з кнопкою редагування */}
            <div className={styles.avatarWrapper}>
                <div className={styles.avatarCircle}>
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className={styles.avatarImg} />
                    ) : (
                        displayName.charAt(0).toUpperCase()
                    )}
                </div>
                
                {/* Кнопка зміни фото */}
                <button 
                    className={styles.editAvatarBtn} 
                    onClick={() => fileInputRef.current.click()}
                    disabled={uploading}
                >
                    {uploading ? "..." : "📷"} 
                </button>
                
                {/* Прихований інпут */}
                <input 
                    type="file" 
                    id="avatarUpload"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    style={{ display: 'none' }}
                />
            </div>

            <h2>{displayName}</h2>
            <p>{user?.email}</p>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </aside>

        {/* ПРАВА КОЛОНКА - СПИСОК ПОДОРОЖЕЙ */}
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>My Bookings & Trips</h1>

          {bookings.length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No trips booked yet.</h3>
              <p>It seems you haven't planned any adventure yet.</p>
              <button onClick={() => navigate("/discover")}>Discover Places</button>
            </div>
          ) : (
            <div className={styles.bookingsGrid}>
              {bookings.map((item) => (
                <div key={item.id} className={styles.bookingCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.destination}>
                      <span className={styles.label}>Trip to</span>
                      <h3>{item.destination_city}</h3>
                    </div>
                    <div className={styles.dateBadge}>
                      {new Date(item.flight_date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className={styles.flightDetails}>
                    <div className={styles.detailRow}>
                      <span className={styles.icon}>🛫</span>
                      <div>
                        <span className={styles.subLabel}>Airline</span>
                        <p>{item.airline || "Airline"}</p>
                      </div>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.icon}>📍</span>
                      <div>
                        <span className={styles.subLabel}>Route</span>
                        <p>{item.origin_city} ➝ {item.destination_city}</p>
                      </div>
                    </div>
                    <div className={styles.detailRow}>
                      <span className={styles.icon}>💰</span>
                      <div>
                        <span className={styles.subLabel}>Price</span>
                        <p>${item.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.statusBadge}>
                    {item.status || "Confirmed"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}