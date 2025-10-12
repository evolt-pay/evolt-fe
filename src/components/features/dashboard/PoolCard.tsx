import { Info, ArrowUpDown } from "lucide-react";
import { cn } from "@evolt/lib/utils";

interface PoolCardProps {
  name: string;
  totalValueLocked: string;
  totalValueLockedSmall: string;
  totalEarnings: string;
  totalEarningsSmall: string;
  percentageChange?: string;
  isActive?: boolean;
}

export const PoolCard = ({
  name,
  totalValueLocked,
  totalValueLockedSmall,
  totalEarnings,
  totalEarningsSmall,
  percentageChange,
  isActive = true,
}: PoolCardProps) => {
  return (
    <div className="w-full max-w-2xl rounded-3xl bg-black p-4 px-6 shadow-lg border border-border transition-all duration-300 hover:shadow-xl">
      <h2
        className={cn(
          "text-2xl font-medium  transition-colors duration-300",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {name}
      </h2>

      <div className="flex items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">
              Total Value Locked
            </span>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            className={cn(
              "text-xl  font-medium mb-1",
              isActive ? "text-foreground" : "text-muted-foreground"
            )}
          >
            = {totalValueLocked}
          </div>
          <div className="text-sm text-muted-foreground">
            {totalValueLockedSmall}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 my-5">
          <div className="h-10 w-px bg-border" />
          <ArrowUpDown className="w-5 h-5 text-muted-foreground" />
          <div className="h-10 w-px bg-border" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">
              Total Earnings
            </span>
            <Info className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-3 mb-1">
            <span
              className={cn(
                "text-xl font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              = {totalEarnings}
            </span>
            {isActive && percentageChange && (
              <span className="text-sm text-accent font-medium flex items-center text-green-400">
                ▲{percentageChange}
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {totalEarningsSmall}
          </div>
        </div>
      </div>
    </div>
  );
};
