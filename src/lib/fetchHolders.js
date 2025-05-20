// src/lib/fetchHolders.js
export default async function fetchHolders() {
  const TOKEN_ADDRESS = "4XKyPd6Z8mts5BTYMJ4xM53z6ZBJUzNpAqUw1JZi1Tkz";
  const HELIUS_API_KEY = process.env.HELIUS_API_KEY;

  try {
    const [holdersRes, supplyRes, priceRes] = await Promise.all([
      fetch(`https://rpc.helius.xyz/?api-key=${HELIUS_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "getTokenLargestAccounts",
          method: "getTokenLargestAccounts",
          params: [TOKEN_ADDRESS],
        }),
      }),
      fetch(`https://rpc.helius.xyz/?api-key=${HELIUS_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "getTokenSupply",
          method: "getTokenSupply",
          params: [TOKEN_ADDRESS],
        }),
      }),
      fetch(`https://api.dexscreener.com/latest/dex/search?q=${TOKEN_ADDRESS}`),
    ]);

    const [holdersData, supplyData, priceData] = await Promise.all([
      holdersRes.json(),
      supplyRes.json(),
      priceRes.json(),
    ]);

    const topAccounts = holdersData?.result?.value?.slice(0, 20) || [];
    const tokenAccountAddresses = topAccounts.map(acc => acc.address);
    const totalSupply = parseFloat(supplyData?.result?.value?.uiAmount || 0);
    const tokenPrice = parseFloat(priceData.pairs?.[0]?.priceUsd || 0);

    const ownersRes = await fetch(`https://rpc.helius.xyz/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getMultipleAccounts",
        params: [tokenAccountAddresses, { encoding: "jsonParsed" }],
      }),
    });

    const ownersData = await ownersRes.json();

    const holders = topAccounts.map((account, index) => {
      const amount = account.uiAmount;
      const percentage = (amount / totalSupply) * 100;
      const valueUSD = amount * tokenPrice;
      const accountInfo = ownersData?.result?.value?.[index];
      const owner = accountInfo?.data?.parsed?.info?.owner ?? "Unknown";

      return {
        rank: index + 1,
        address: owner,
        shortAddress: `${owner.slice(0, 4)}...${owner.slice(-4)}`,
        amount: amount.toLocaleString(undefined, { maximumFractionDigits: 9 }),
        percentage: percentage.toFixed(2) + "%",
        valueUSD: valueUSD.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      };
    });

    return { holders, totalSupply, tokenPrice };
  } catch (err) {
    console.error("Failed to fetch holders:", err);
    return { holders: [], totalSupply: 0, tokenPrice: 0 };
  }
}
