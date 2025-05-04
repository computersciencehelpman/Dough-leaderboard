// src/pages/simple.js
import Leaderboard from "../components/Leaderboard.js";

export default function SimplePage({ holders, totalSupply, tokenPrice }) {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Top Holders (Simple View)</h1>
      <Leaderboard holders={holders} totalSupply={totalSupply} tokenPrice={tokenPrice} />
    </div>
  );
}

// Optionally, add this to fetch data server-side
export { getServerSideProps } from "./index";
