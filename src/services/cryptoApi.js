import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

// ✅ Fetch Global Crypto Stats
export const fetchGlobalStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/global`);
    return response.data;
  } catch (error) {
    console.error("Error fetching global stats:", error);
    return null;
  }
};

// ✅ Fetch Top 100 Cryptocurrencies
export const fetchCryptos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
    return [];
  }
};

// ✅ Fetch Single Cryptocurrency Details
export const fetchCryptoDetails = async (coinId) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${coinId} details:`, error);
    return null;
  }
};

// ✅ Fetch Cryptocurrency Market Chart (Price Data)
export const fetchCryptoMarketChart = async (coinId, days = 365) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: days,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${coinId} market chart:`, error);
    return null;
  }
};

// ✅ Search for a Cryptocurrency by Name
export const searchCrypto = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { query },
    });
    return response.data.coins;
  } catch (error) {
    console.error(`Error searching for ${query}:`, error);
    return [];
  }
};
