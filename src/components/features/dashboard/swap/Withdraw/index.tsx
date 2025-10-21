import { useState } from "react";
import { WithdrawAmountCard } from "./WithdrawAmountCard";
import { WithdrawSummaryCard } from "./WithdrawSummaryCard";

export const TokenWithdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");

  const handleWithdrawAmountChange = (value: string) => {
    // Only allow numbers and one decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setWithdrawAmount(value);

      if (value && !isNaN(parseFloat(value))) {
        // Assuming a 1:1 swap rate for simplicity
        setUsdcAmount(parseFloat(value).toFixed(2));
      } else {
        setUsdcAmount("");
      }
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <WithdrawAmountCard
          withdrawAmount={withdrawAmount}
          usdcAmount={usdcAmount}
          onWithdrawAmountChange={handleWithdrawAmountChange}
        />
      </div>

      <WithdrawSummaryCard
        withdrawAmount={withdrawAmount}
        usdcAmount={usdcAmount}
      />
    </div>
  );
};
