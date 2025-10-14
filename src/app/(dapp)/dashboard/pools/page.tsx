import { BackButton } from "@evolt/components/common/BackButton";
import { InvestmentCard } from "@evolt/components/features/dashboard/InvestmentCard";
import React from "react";

function page() {
  return (
    <div className="mt-10 w-full max-w-2xl m-auto space-y-5">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1>Investment Pools</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 space-y-5">
        <InvestmentCard
          id="1"
          name="TotalEnergies"
          subtitle="Chika Logistics Ltd."
          logo="https://via.placeholder.com/80/FFFFFF/000000?text=TE"
          apy="18.5% APY"
          minAmount="700 USDT"
          maxAmount="1,200 USDT"
          fundingStatus="Open"
          fundingPercentage={73}
          progressLeftText="5 Days Left"
        />

        <InvestmentCard
          id="2"
          name="Honeywell"
          subtitle="Mind Colony LTD"
          logo="https://via.placeholder.com/80/FFFFFF/000000?text=H"
          apy="18.5% APY"
          minAmount="700 USDT"
          maxAmount="1,200 USDT"
          fundingStatus="Closed"
          fundingPercentage={100}
          progressLeftText="No More Stakers"
        />
      </div>
    </div>
  );
}

export default page;
