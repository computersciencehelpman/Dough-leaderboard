import React from "react";

export default function Leaderboard({ holders = [], totalSupply, tokenPrice }) {
  return (
    <div className="bg-white text-black dark:bg-[#0d0d0d] dark:text-white px-4 sm:px-8 py-8 pb-32">
      <h1 className="text-2xl font-bold mb-6">Top Holders (Simple View)</h1>

      <table className="w-full border-separate border-spacing-y-2 text-sm sm:text-base">
        <thead>
          <tr className="text-left text-gray-600 dark:text-gray-300 uppercase text-xs border-b border-gray-700">
            <th className="pb-2">Rank</th>
            <th className="pb-2">Wallet</th>
            <th className="pb-2">Amount</th>
            <th className="pb-2">% of Supply</th>
            <th className="pb-2">Value (USD)</th>
          </tr>
        </thead>
        <tbody>
          {holders.map((holder, index) => (
            <tr
              key={index}
              className="bg-gray-100 dark:bg-zinc-900 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded"
            >
              <td className="py-2 px-3 font-semibold text-white">{holder.rank}</td>
              <td className="py-2 px-3">
                <a
                  href={`https://solscan.io/account/${holder.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-400 hover:text-blue-200"
                >
                  {holder.shortAddress || holder.address}
                </a>
              </td>
              <td className="py-2 px-3 text-white w-[200px]">
                <div className="relative w-full bg-gray-800 h-5 rounded overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: `${parseFloat(holder.percentage) || 0}%` }}
                  />
                </div>
                <div className="text-sm mt-1">{holder.amount}</div>
              </td>
              <td className="py-2 px-3">{holder.percentage}</td>
              <td className="py-2 px-3 text-white">{holder.valueUSD}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>Total Supply: {totalSupply}</p>
        <p>Token Price (USD): ${tokenPrice}</p>
      </div>
    </div>
  );
}
