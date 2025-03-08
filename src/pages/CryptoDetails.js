import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCryptoDetails, fetchCryptoMarketChart } from "../services/cryptoApi";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoDetails(coinId);
      const marketChart = await fetchCryptoMarketChart(coinId, 30); // 30-day chart
      setCrypto(data);
      setChartData(marketChart);
    };
    getData();
  }, [coinId]);

  if (!crypto) return <p className="loading">Loading...</p>;

  return (
    <div className="crypto-details-container">
      {/* Coin Name & Image */}
      <div className="crypto-header">
        <img src={crypto.image.large} alt={crypto.name} className="crypto-logo" />
        <h1>{crypto.name} ({crypto.symbol.toUpperCase()})</h1>
      </div>

      {/* Grid Layout for Stats */}
      <div className="crypto-stats-grid">
        <div className="stat-box"><p>💰 <strong>Current Price:</strong></p> <h2>${crypto.market_data.current_price.usd.toLocaleString()}</h2></div>
        <div className="stat-box"><p>🏦 <strong>Market Cap:</strong></p> <h2>${crypto.market_data.market_cap.usd.toLocaleString()}</h2></div>
        <div className="stat-box"><p>📊 <strong>Total Supply:</strong></p> <h2>{crypto.market_data.total_supply?.toLocaleString() || "N/A"}</h2></div>
        <div className="stat-box"><p>🔝 <strong>Max Supply:</strong></p> <h2>{crypto.market_data.max_supply?.toLocaleString() || "∞"}</h2></div>
        <div className="stat-box"><p>🔄 <strong>Circulating Supply:</strong></p> <h2>{crypto.market_data.circulating_supply.toLocaleString()}</h2></div>
        <div className="stat-box"><p>📈 <strong>24h High:</strong></p> <h2>${crypto.market_data.high_24h.usd.toLocaleString()}</h2></div>
        <div className="stat-box"><p>📉 <strong>24h Low:</strong></p> <h2>${crypto.market_data.low_24h.usd.toLocaleString()}</h2></div>
        <div className="stat-box"><p>🕒 <strong>Last Updated:</strong></p> <h2>{new Date(crypto.last_updated).toLocaleString()}</h2></div>
      </div>

      {/* 📈 Price Chart */}
      {chartData && (
        <div className="chart-container">
          <h2>📊 Price Trend</h2>
          <Line
            data={{
              labels: chartData.prices.map((price) => new Date(price[0]).toLocaleDateString()),
              datasets: [
                {
                  label: `${crypto.name} Price (USD)`,
                  data: chartData.prices.map((price) => price[1]),
                  borderColor: "#3b82f6",
                  fill: false,
                  pointRadius: 2,
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: { grid: { display: false } },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CryptoDetails;
