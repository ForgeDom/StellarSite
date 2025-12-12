import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../scripts/supabaseClient";
import styles from "../../assests/css/Login/Login.module.scss";

// Ті самі картинки
import loginBg from "../../assests/img/Login/login-bg.png";
import closeIcon from "../../assests/img/Login/close.png"; // Тут можна використати ЧОРНУ іконку (для білого фону)
import facebookIcon from "../../assests/img/Login/facebook.png";
import twitterIcon from "../../assests/img/Login/twitter.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error("Invalid email or password");

      // Якщо успіх, AuthContext сам оновить стан і Хедер зміниться
      navigate("/"); 

    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      
      {/* --- LEFT SIDE: IMAGE --- */}
      <div className={styles.leftSide} style={{ backgroundImage: `url(${loginBg})` }}>
        <div className={styles.overlay}></div>
        <h1 className={styles.bigTitle}>Go places you've dreamed of.</h1>
        <p className={styles.smallText}>
          Wafer dessert danish. Powder toffee cookie jelly beans.
        </p>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className={styles.rightSide}>
        
        {/* Кнопка закриття (Тут фон білий, тому іконка має бути темною) */}
        <button className={styles.closeBtn} onClick={() => navigate("/")}>
          <img src={closeIcon} alt="close" />
        </button>

        <div className={styles.topInfo}>
            <span>Don’t have an account?</span>
            <button className={styles.signUpBtn} onClick={() => navigate("/auth/signup")}>Sign up</button>
        </div>

        <h2 className={styles.signInTitle}>Sign in with</h2>

        <div className={styles.socialButtons}>
            <button className={styles.socialBtn}><img src={facebookIcon} alt="" /> Facebook</button>
            <button className={styles.socialBtn}><img src={twitterIcon} alt="" /> Twitter</button>
        </div>

        <div className={styles.divider}><span>OR</span></div>

        <form className={styles.formBox} onSubmit={handleLogin}>
            {errorMsg && <div className={styles.errorBox}>{errorMsg}</div>}

            <input 
              type="email" placeholder="Email" className={styles.input} 
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <input 
              type="password" placeholder="Password" className={styles.input} 
              value={password} onChange={(e) => setPassword(e.target.value)} required
            />

            <div className={styles.optionsRow}>
                <label className={styles.keepSigned}>
                    <input type="checkbox" /> Stay signed in
                </label>
                <button type="button" className={styles.forgotBtn}>Forgot password?</button>
            </div>

            <button className={styles.submitBtn} type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
      </div>
    </div>
  );
}