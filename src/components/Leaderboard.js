export default function Leaderboard({ holders }) {
  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Top Holders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg shadow">
          <thead className="bg-gray-800 text-sm uppercase text-gray-400">
            <tr>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Wallet</th>
              <th className="px-4 py-3 text-right">Amount Held</th>
              <th className="px-4 py-3 text-right">% of Supply</th>
              <th className="px-4 py-3 text-right">Value (USD)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {holders.map(holder => (
              <tr key={holder.address} className="hover:bg-gray-800">
                <td className="px-4 py-3">{holder.rank}</td>
                <td className="px-4 py-3">{holder.shortAddress}</td>
                <td className="px-4 py-3 text-right">{holder.amount}</td>
                <td className="px-4 py-3 text-right">{holder.percentage}</td>
                <td className="px-4 py-3 text-right">${holder.valueUSD}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
