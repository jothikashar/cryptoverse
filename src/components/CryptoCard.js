import React from "react";

const CryptoCard = ({ name, price, marketCap, dailyChange, iconUrl }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <div className="flex items-center space-x-2">
        <img src={iconUrl} alt={name} className="w-6 h-6" />
        <h2 className="text-lg font-semibold">{name}</h2>
      </div>
      <p>Price: ${price}</p>
      <p>Market Cap: ${marketCap}B</p>
      <p className={`text-sm ${dailyChange >= 0 ? "text-green-500" : "text-red-500"}`}>
        Daily Change: {dailyChange}%
      </p>
    </div>
  );
};

export default CryptoCard;
