import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import Header from '../src/components/Header';
import LandingPage from "./screens/LandingPage/LandingPage";
import Layout from "./components/Layout";
import LoginPage from "../src/screens/Login/Login";
import RegisterPage from "../src/screens/Login/RegisterPage";
import FlightsPage from "../src/screens/FlightsPage/FlightsPage";
import DiscoverPage from "../src/screens/Discover/DiscoverPage";
import TripsPage from "../src/screens/TripsPage/TripsPage";
import DiscoverData from "../src/screens/DiscoverData/DiscoverData";
import TripDetails from "../src/screens/DiscoverData/TripDetails";
import PaymentPage from "../src/screens/PaymentPage/PaymentPage";
import ProfilePage from "../src/screens/ProfilePage/ProfilePage";


function App() {

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      document.documentElement.classList.add("scroll-active");

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.documentElement.classList.remove("scroll-active");
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/discoverData" element={<DiscoverData/>}/>
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>

          {/* AUTH */}
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<RegisterPage />} />

          {/* FLIGHTS */}
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
