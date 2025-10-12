import { useState } from "react";
import { Button } from "@evolt/components/ui/button";
import { Checkbox } from "@evolt/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@evolt/components/ui/drawer";

interface InvestmentDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvestmentDrawer({
  open,
  onOpenChange,
}: InvestmentDrawerProps) {
  const [amount, setAmount] = useState("500");
  const [consent, setConsent] = useState(false);

  const availableBalance = 534.9;
  const duration = 55;
  const apy = 1.8;
  const invoiceNumber = "#12345";

  const estimatedEarnings = (
    (parseFloat(amount || "0") * (apy / 100) * duration) /
    365
  ).toFixed(2);

  const handleMaxClick = () => {
    setAmount(availableBalance.toString());
  };

  const handleConfirm = () => {
    if (consent && amount) {
      console.log("Confirmed staking:", { amount, duration, invoiceNumber });
      onOpenChange(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-drawer-bg border-drawer-border bg-black">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="pt-8">
            <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-text-muted/40" />
            <DrawerTitle className="text-center text-2xl font-semibold text-text-primary">
              Join Investment Capital Pool
            </DrawerTitle>
          </DrawerHeader>

          <div className="px-6 pb-8 space-y-6">
            {/* Amount Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg text-text-secondary">
                  Amount to Stake
                </label>
                <Button
                  onClick={handleMaxClick}
                  size="sm"
                  className="px-6 rounded-full"
                >
                  MAX
                </Button>
              </div>

              <div className="bg-drawer-card border border-drawer-border rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-text-muted">USDT/USDC</span>
                  <div className="h-6 w-px bg-drawer-border" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent text-3xl font-medium text-text-primary outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="text-right text-sm text-text-muted">
                  Avl: {availableBalance.toFixed(2)} USDT
                </div>
              </div>
            </div>

            {/* Staking Details */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-text-secondary">You are staking :-</span>
                <span className="text-xl font-semibold text-text-primary">
                  {amount} USDT
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-text-secondary">Into Pool for :-</span>
                <span className="text-xl font-semibold text-text-primary">
                  Invoice {invoiceNumber}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-text-secondary">Duration :-</span>
                <span className="text-xl font-semibold text-text-primary">
                  {duration} Days
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-text-secondary">
                  Estimated Earnings :-
                </span>
                <span className="text-xl font-semibold text-text-primary">
                  {estimatedEarnings} USDT
                </span>
                <span className="text-success font-medium">{apy}%</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-drawer-border" />

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent"
                checked={consent}
                onCheckedChange={(checked) => setConsent(checked as boolean)}
                className="mt-1 border-drawer-border data-[state=checked]:bg-indigo data-[state=checked]:border-indigo"
              />
              <label
                htmlFor="consent"
                className="text-sm text-text-muted leading-relaxed cursor-pointer"
              >
                I give my full consent for my USDC to be utilized as the staking
                currency for this investment pool.
              </label>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirm}
              disabled={!consent || !amount || parseFloat(amount) <= 0}
              size="lg"
              className="w-full rounded-2xl h-14 text-lg font-medium"
            >
              Confirm & Join Pool
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
