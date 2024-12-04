import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // Stil dosyasını ayrı bir CSS dosyasına bağlayalım.



const Home = () => {
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate("/order");
    };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Teknolojik Yemekler</h1>
        <h2 className="home-subtitle">KOD ACIKTIRIR</h2>
        <h2 className="home-subtitle">PİZZA, DOYURUR</h2>
        <button className="home-button" onClick={handleOrderClick}>
          ACIKTIM
        </button>
      </header>
     
    </div>
  );
};

export default Home;
