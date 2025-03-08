import React, { useEffect, useState } from "react";
import { fetchGlobalStats, fetchCryptos } from "../services/cryptoApi";
import { Link } from "react-router-dom";


const Home = () => {
  const [globalStats, setGlobalStats] = useState(null);
  const [topCryptos, setTopCryptos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const stats = await fetchGlobalStats();
      const cryptos = await fetchCryptos();

      setGlobalStats(stats.data);
      setTopCryptos(cryptos.slice(0, 10)); // Get top 10 cryptocurrencies
    };
    getData();
  }, []);

  if (!globalStats) return <p className="loading">Loading...</p>;

  return (
    <div className="home-container">
      {/* Global Stats Section */}
      <h1 className="section-title">🌍 Global Crypto Stats</h1>
      <div className="stats-grid">
        <div className="stat-box">
          <p>Total Cryptocurrencies</p>
          <h2>{globalStats.active_cryptocurrencies.toLocaleString()}</h2>
        </div>
        <div className="stat-box">
          <p>Total Exchanges</p>
          <h2>{globalStats.markets.toLocaleString()}</h2>
        </div>
        <div className="stat-box">
          <p>Total Market Cap</p>
          <h2>${(globalStats.total_market_cap.usd / 1e12).toFixed(2)}T</h2>
        </div>
        <div className="stat-box">
          <p>Total 24h Volume</p>
          <h2>${(globalStats.total_volume.usd / 1e9).toFixed(2)}B</h2>
        </div>
        <div className="stat-box">
          <p>Bitcoin Dominance</p>
          <h2>{globalStats.market_cap_percentage.btc.toFixed(2)}%</h2>
        </div>
        <div className="stat-box">
          <p>Ethereum Dominance</p>
          <h2>{globalStats.market_cap_percentage.eth.toFixed(2)}%</h2>
        </div>
      </div>

      {/* Top 10 Cryptocurrencies Section */}
      <h2 className="section-title">🔥 Top 10 Cryptocurrencies</h2>
      <div className="crypto-grid">
      {topCryptos.map((crypto, index) => (
  <Link to={`/crypto/${crypto.id}`} key={crypto.id} className="crypto-card-link">
    <div className="crypto-card">
      <div className="crypto-header">
        <h3>
          
          <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
        </h3>
      </div>
      {index + 1}. {crypto.name}
      <p><strong>Price:</strong> ${crypto.current_price.toLocaleString()}</p>
      <p><strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}</p>
      <p><strong>24h Change:</strong> 
        <span className={crypto.price_change_percentage_24h >= 0 ? "positive" : "negative"}>
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
      <p><strong>24h High:</strong> ${crypto.high_24h.toLocaleString()}</p>
      <p><strong>24h Low:</strong> ${crypto.low_24h.toLocaleString()}</p>
    </div>
  </Link>
))}

      </div>

      {/* Show More Link */}
      <a href="/cryptocurrencies" className="show-more">Show More</a>
    </div>
  );
};

export default Home;
