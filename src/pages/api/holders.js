export default async function handler(req, res) {
  const { HELIUS_API_KEY } = process.env;
  const TOKEN_ADDRESS = "4XKyPd6Z8mts5BTYMJ4xM53z6ZBJUzNpAqUw1JZi1Tkz";

  try {
    // Fetch the top holders
    const holdersResponse = await fetch(`https://rpc.helius.xyz/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "getTokenLargestAccounts",
        method: "getTokenLargestAccounts",
        params: [TOKEN_ADDRESS],
      }),
    });

    const holdersData = await holdersResponse.json();

    if (!holdersData.result?.value) {
      return res.status(500).json({ error: "Invalid response from Helius (holders)" });
    }

    // Fetch the total supply dynamically
    const supplyResponse = await fetch(`https://rpc.helius.xyz/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "getTokenSupply",
        method: "getTokenSupply",
        params: [TOKEN_ADDRESS],
      }),
    });

    const supplyData = await supplyResponse.json();
    const totalSupply = parseFloat(supplyData?.result?.value?.uiAmount);
    if (!totalSupply || isNaN(totalSupply)) {
      return res.status(500).json({ error: "Invalid response from Helius (supply)" });
    }

    // Fetch the token price using Dexscreener's search API
    const searchResponse = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${TOKEN_ADDRESS}`);
    const searchData = await searchResponse.json();

    if (!searchData.pairs || searchData.pairs.length === 0) {
      return res.status(500).json({ error: "Token pair not found on Dexscreener" });
    }

    const TOKEN_PRICE_USD = parseFloat(searchData.pairs[0].priceUsd);
    if (!TOKEN_PRICE_USD || isNaN(TOKEN_PRICE_USD)) {
      return res.status(500).json({ error: "Invalid price data from Dexscreener" });
    }

    // Format the top 20 holders
    const holders = holdersData.result.value
      .sort((a, b) => b.uiAmount - a.uiAmount)
      .slice(0, 20)
      .map((holder, index) => {
        const amount = holder.uiAmount;
        const percentage = (amount / totalSupply) * 100;
        const valueUSD = amount * TOKEN_PRICE_USD;

        return {
          rank: index + 1,
          address: holder.address,
          shortAddress: `${holder.address.slice(0, 4)}...${holder.address.slice(-4)}`,
          amount: amount.toLocaleString(undefined, { maximumFractionDigits: 9 }),
          percentage: percentage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%',
          valueUSD: valueUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 }),
        };
      });

    // Send the response
    res.status(200).json({
      holders,
      totalSupply: totalSupply.toLocaleString(undefined, { maximumFractionDigits: 0 }),
      tokenPrice: TOKEN_PRICE_USD.toFixed(6),
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
