import React from "react";

const TopTenCryptoTable = ({ topCryptos }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Market Cap</th>
            <th className="px-4 py-2 text-left">Daily Change</th>
          </tr>
        </thead>
        <tbody>
          {topCryptos.map((crypto, index) => (
            <tr key={crypto.id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <img src={crypto.iconUrl} alt={crypto.name} className="w-5 h-5" />
                <span>{crypto.name}</span>
              </td>
              <td className="px-4 py-2">${crypto.price}</td>
              <td className="px-4 py-2">${crypto.marketCap}B</td>
              <td className={`px-4 py-2 ${crypto.dailyChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {crypto.dailyChange}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopTenCryptoTable;
