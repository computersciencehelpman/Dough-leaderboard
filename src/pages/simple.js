import Leaderboard from "@/components/Leaderboard";
import fetchHolders from "@/lib/fetchHolders";
import DarkModeToggle from "@/components/DarkModeToggle";

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
    <div className="min-h-screen bg-white dark:bg-[#0d0d0d] text-black dark:text-white relative">
      <Leaderboard
        holders={holders}
        totalSupply={totalSupply}
        tokenPrice={tokenPrice}
      />
      <DarkModeToggle /> {/* ✅ always visible, fixed at bottom center */}
    </div>
  );
}
