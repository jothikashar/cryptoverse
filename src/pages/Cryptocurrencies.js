import React, { useState, useEffect } from "react";
import { fetchCryptos, searchCrypto } from "../services/cryptoApi";
import { useNavigate } from "react-router-dom";

const Cryptocurrencies = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTopCryptos = async () => {
      const data = await fetchCryptos();
      setCryptos(data.slice(0, 50));
    };
    loadTopCryptos();
  }, []);

  useEffect(() => {
    const searchCryptos = async () => {
      if (!searchQuery.trim()) {
        setIsSearching(false);
        const data = await fetchCryptos();
        setCryptos(data.slice(0, 52));
        return;
      }
      setIsSearching(true);
      const data = await searchCrypto(searchQuery);
      setCryptos(data);
    };

    const debounceTimeout = setTimeout(searchCryptos, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <div className="crypto-container">
      <input
        type="text"
        placeholder="🔍 Search Cryptocurrency..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="crypto-grid">
        {cryptos.length > 0 ? (
          cryptos.map((crypto, index) => (
            <div 
              key={crypto.id || index} 
              className="crypto-card"
              onClick={() => navigate(`/crypto/${crypto.id}`)}
            >
              <div className="crypto-header">
                <img src={crypto.thumb || crypto.image} alt={crypto.name} className="crypto-icon" />
                <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
              </div>

              <div className="crypto-details">
                <div className="crypto-item">
                  <span className="label">Price</span> 
                  <span className="value">${crypto.current_price?.toLocaleString() || "N/A"}</span>
                </div>
                <div className="crypto-item">
                  <span className="label">Market Cap</span> 
                  <span className="value">${crypto.market_cap?.toLocaleString() || "N/A"}</span>
                </div>
                <div className="crypto-item">
                  <span className="label">24h Change</span> 
                  <span className={`value ${crypto.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}>
                    {crypto.price_change_percentage_24h?.toFixed(2) || "N/A"}%
                  </span>
                </div>
                <div className="crypto-item">
                  <span className="label">24h High</span> 
                  <span className="value">${crypto.high_24h?.toLocaleString() || "N/A"}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">{isSearching ? "No results found." : "Loading..."}</p>
        )}
      </div>
    </div>
  );
};

export default Cryptocurrencies;
