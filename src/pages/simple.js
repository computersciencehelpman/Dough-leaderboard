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
    revalidate: 86400, // 24 hours
  };
}

export default function SimplePage({ holders, totalSupply, tokenPrice }) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      {/* Leaderboard section */}
      <main className="flex-grow">
        <Leaderboard
          holders={holders}
          totalSupply={totalSupply}
          tokenPrice={tokenPrice}
        />
      </main>

        <DarkModeToggle />
     
    </div>
  );
}
