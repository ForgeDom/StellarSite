import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../scripts/supabaseClient";
import styles from "../../assests/css/Login/Register.module.scss";

// Картинки
import registerBg from "../../assests/img/Login/login-bg.png"; 
import closeIcon from "../../assests/img/Login/close-white.png";
import facebookIcon from "../../assests/img/Login/facebook.png";
import twitterIcon from "../../assests/img/Login/twitter.png";
// Можна додати іконку листа, якщо є, або просто текст
// import mailIcon from "../../assests/img/Login/mail.png"; 

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Додаємо стан успішної реєстрації
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          // ✅ Важливий фікс: щоб посилання вело на правильний домен
          emailRedirectTo: `${window.location.origin}/auth/login`
        },
      });

      if (error) throw error;

      // ✅ Замість alert і редіректу, показуємо повідомлення
      setSuccess(true);

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerWrapper}>
      
      {/* --- LEFT SIDE: FORM OR SUCCESS MSG --- */}
      <div className={styles.leftSide}>
        
        {/* 🔥 УМОВНИЙ РЕНДЕРИНГ: Якщо успіх - показуємо інфо про пошту, інакше - форму */}
        {success ? (
          <div className={styles.successBox}>
            <h2 className={styles.pageTitle}>Check your inbox!</h2>
            <p className={styles.successText}>
              We have sent a confirmation link to <strong>{email}</strong>.
              <br />
              Please click the link to verify your account and log in.
            </p>
            
            <button 
              className={styles.submitBtn} 
              onClick={() => navigate("/auth/login")}
            >
              Go to Login
            </button>
            
            <button 
              className={styles.linkBtn} 
              onClick={() => setSuccess(false)} // Щоб виправити пошту, якщо помилились
              style={{ marginTop: "20px", display: "block", width: "100%" }}
            >
              Entered wrong email?
            </button>
          </div>
        ) : (
          /* --- СТАНДАРТНА ФОРМА --- */
          <>
            <div className={styles.topInfo}>
              <span>Already have an account?</span>
              <button className={styles.linkBtn} onClick={() => navigate("/auth/login")}>
                Log in
              </button>
            </div>

            <h2 className={styles.pageTitle}>Create Account</h2>

            <div className={styles.socialButtons}>
              <button className={styles.socialBtn}>
                <img src={facebookIcon} alt="Facebook" /> Facebook
              </button>
              <button className={styles.socialBtn}>
                <img src={twitterIcon} alt="Twitter" /> Twitter
              </button>
            </div>

            <div className={styles.divider}><span>Or sign up with email</span></div>

            <form className={styles.formBox} onSubmit={handleRegister}>
              {errorMsg && <div className={styles.errorBox}>{errorMsg}</div>}

              <input 
                type="text" 
                placeholder="Full Name" 
                className={styles.input} 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                placeholder="Email address" 
                className={styles.input} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                className={styles.input} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />

              <label className={styles.checkboxRow}>
                <input type="checkbox" required />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>

              <button className={styles.submitBtn} type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>
          </>
        )}
      </div>

      {/* --- RIGHT SIDE: IMAGE --- */}
      <div className={styles.rightSide} style={{ backgroundImage: `url(${registerBg})` }}>
        <button className={styles.closeBtn} onClick={() => navigate("/")}>
          <img src={closeIcon} alt="close" />
        </button>

        <h1 className={styles.bigTitle}>Start your new journey today.</h1>
        <p className={styles.smallText}>
          Join thousands of travelers exploring the world with Stellar.
        </p>
      </div>
    </div>
  );
}