
import Leaderboard from "@/components/Leaderboard";
import fetchHolders from "@/lib/fetchHolders"; 
export async function getStaticProps() {
  const data = await fetchHolders();

  return {
    props: {
      holders: data.holders || [],
      totalSupply: data.totalSupply || 0,
      tokenPrice: data.tokenPrice || 0,
    },
    revalidate: 86400, 
  };
}

export default function SimplePage({ holders, totalSupply, tokenPrice }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Top Holders (Simple View)</h1>
      <Leaderboard
        holders={holders}
        totalSupply={totalSupply}
        tokenPrice={tokenPrice}
      />
    </div>
  );
}
