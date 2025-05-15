
import fetchHolders from "@/lib/fetchHolders";

export default async function handler(req, res) {
  const data = await fetchHolders();
  res.status(200).json(data);
}

    const holdersData = await holdersResponse.json();

    const topAccounts = holdersData?.result?.value?.slice(0, 20) || [];

    if (topAccounts.length === 0) {
      return res.status(500).json({ error: "No holder data found" });
    }

    const tokenAccountAddresses = topAccounts.map(acc => acc.address);

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
      return res.status(500).json({ error: "Invalid supply response" });
    }

    const searchResponse = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${TOKEN_ADDRESS}`);
    const searchData = await searchResponse.json();

    if (!searchData.pairs?.length) {
      return res.status(500).json({ error: "Price data not found" });
    }

    const TOKEN_PRICE_USD = parseFloat(searchData.pairs[0].priceUsd);

    const ownersResponse = await fetch(`https://rpc.helius.xyz/?api-key=${HELIUS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getMultipleAccounts",
        params: [tokenAccountAddresses, { encoding: "jsonParsed" }],
      }),
    });

    const ownersData = await ownersResponse.json();

    const holders = topAccounts.map((account, index) => {
      const amount = account.uiAmount;
      const percentage = (amount / totalSupply) * 100;
      const valueUSD = amount * TOKEN_PRICE_USD;

      const accountInfo = ownersData?.result?.value?.[index];
      const owner = accountInfo?.data?.parsed?.info?.owner ?? "Unknown";

      return {
        rank: index + 1,
        address: owner,
        shortAddress: `${owner.slice(0, 4)}...${owner.slice(-4)}`,
        amount: amount.toLocaleString(undefined, { maximumFractionDigits: 9 }),
        percentage: percentage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%',
        valueUSD: valueUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 7 }),
      };
    });

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
