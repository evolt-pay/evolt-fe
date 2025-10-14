import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@evolt/components/ui/tabs";
import { PoolCard } from "./PoolCard";
export function AssetContent() {
  return (
    <div>
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Stake</TabsTrigger>
          <TabsTrigger value="completed">Completed Stake</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <PoolCard
            name="Dangote Rice Mill"
            totalValueLocked="245.00 USDT"
            totalValueLockedSmall="0.0000000134S"
            totalEarnings="3.23 USDT"
            totalEarningsSmall="0.0000002345"
            percentageChange="0.028%"
            isActive={true}
          />
        </TabsContent>
        <TabsContent value="completed">
          <PoolCard
            name="Dangote Rice Mill"
            totalValueLocked="245.00 USDT"
            totalValueLockedSmall="0.0000000134S"
            totalEarnings="3.23 USDT"
            totalEarningsSmall="0.0000002345"
            isActive={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AssetContent;
