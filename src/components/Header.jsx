import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../assests/css/Header.module.scss";
import { useAuth } from "../context/AuthContext";
import defaultAvatar from "../assests/img/User/user.png"; // Перевірте шлях

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [transparent, setTransparent] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Для мобільного бургера
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // ДЛЯ ВИПАДАЮЧОГО МЕНЮ

  // Для закриття меню при кліку поза ним
  const dropdownRef = useRef(null);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0];
  const avatarUrl = user?.user_metadata?.avatar_url || defaultAvatar;

  // Закриваємо меню при переході
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location]);

  // Закриття dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Логіка прозорості (Ваша)
  useEffect(() => {
    let observer;
    const createObserver = (id, threshold = 0.1) => {
      const section = document.getElementById(id);
      if (!section) { setTransparent(false); return; }
      observer = new IntersectionObserver(([entry]) => {
        setTransparent(entry.isIntersecting);
      }, { threshold });
      observer.observe(section);
    };
    if (location.pathname === "/") createObserver("countries", 0.6);
    else if (location.pathname === "/discover") createObserver("discover-hero", 0.4);
    else if (location.pathname === "/trips") createObserver("trips-hero", 0.1);
    else setTransparent(false);
    return () => observer && observer.disconnect();
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className={`${styles.header} ${transparent && !isMenuOpen ? styles.headerTransparent : ""}`}>
      <div className={styles.container}>

        {/* ЛІВА ЧАСТИНА */}
        <div className={styles.leftSide}>
          <Link to="/" className={styles.navMainLink}>
            <h1>Stellar</h1>
          </Link>
          <nav className={styles.desktopNav}>
            <Link to="/trips" className={styles.navLink}><span>Plan a trip</span></Link>
            <Link to="/discover" className={styles.navLink}><span>Discover</span></Link>
            <Link to="/flights" className={styles.navLink}><span>Check flights</span></Link>
          </nav>
        </div>

        {/* ПРАВА ЧАСТИНА (ПРОФІЛЬ З DROPDOWN) */}
        <div className={styles.desktopAuth}>
          {user ? (
            <div className={styles.userProfileWrapper} ref={dropdownRef}>
              {/* Кнопка профілю */}
              <div
                className={styles.userInfo}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <img src={avatarUrl} alt="User" className={styles.userAvatar} />
                <span className={styles.userName}>{displayName}</span>
                <svg
                  width="10" height="6" viewBox="0 0 10 6" fill="none"
                  className={`${styles.arrowIcon} ${isProfileDropdownOpen ? styles.rotated : ''}`}
                >
                  <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* --- ВИПАДАЮЧЕ МЕНЮ --- */}
              {isProfileDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link to="/profile" className={styles.dropdownItem}>
                    My Profile
                  </Link>
                  <div className={styles.divider}></div>
                  <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutItem}`}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className={styles.loginBtn} onClick={() => navigate("/auth/login")}><span>Login</span></button>
              <button className={styles.signupBtn} onClick={() => navigate("/auth/signup")}><span>Register</span></button>
            </>
          )}
        </div>

        {/* БУРГЕР (Мобільний) */}
        <button
          className={`${styles.burgerBtn} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>

      </div>

      {/* МОБІЛЬНЕ МЕНЮ */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileContent}>
          <Link to="/trips" className={styles.mobileLink}>Plan a trip</Link>
          <Link to="/discover" className={styles.mobileLink}>Discover</Link>
          <Link to="/flights" className={styles.mobileLink}>Check flights</Link>
          <Link to="/profile" className={styles.mobileLink}>My Profile</Link>
          <div className={styles.mobileDivider}></div>
          {user ? (
            <div className={styles.mobileAuthBlock}>
              <div className={styles.mobileUserInfo}>
                <img src={avatarUrl} alt="User" />
                <span>{displayName}</span>
              </div>
              <button onClick={handleLogout} className={styles.mobileLogoutBtn}>Logout</button>
            </div>
          ) : (
            <div className={styles.mobileAuthButtons}>
              <button className={styles.loginBtn} onClick={() => navigate("/auth/login")}>Login</button>
              <button className={styles.signupBtn} onClick={() => navigate("/auth/signup")}>Register</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;