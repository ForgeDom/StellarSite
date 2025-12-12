import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../scripts/supabaseClient";
import styles from "../../assests/css/Login/Register.module.scss";

// Картинки
import registerBg from "../../assests/img/Login/login-bg.png"; 
import closeIcon from "../../assests/img/Login/close-white.png"; // Біла іконка
import facebookIcon from "../../assests/img/Login/facebook.png";
import twitterIcon from "../../assests/img/Login/twitter.png";

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
            full_name: fullName, // Зберігаємо ім'я в метаданих
          },
        },
      });

      if (error) throw error;

      // УСПІХ
      alert("Registration successful! Please log in.");
      navigate("/auth/login");

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerWrapper}>
      
      {/* --- LEFT SIDE: FORM --- */}
      <div className={styles.leftSide}>
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