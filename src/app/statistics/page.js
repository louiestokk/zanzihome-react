import React from "react";
import StatisticsPage from "../../views/StatisticsPage";

export const metadata = {
  title: "ZanziHome Platform Performance & Premium Partner Program",
  description: "Discover ZanziHome traffic analytics, visitor engagement, and automated API synchronization for Verified Premium Partners.",
  alternates: {
    canonical: "https://www.zanzihome.com/statistics",
  },
};

export default function StatisticsPageRoute() {
  return <StatisticsPage />;
}
