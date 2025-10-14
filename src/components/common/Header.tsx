"use client";

import { useState } from "react";
import { UserCircle, LogOut, Settings, User } from "lucide-react";
import Logo from "./logo";
import Link from "next/link";
import { Button } from "@evolt/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@evolt/components/ui/dropdown-menu";

const Header = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = () => {
    // Simulate wallet connection - replace with actual wallet connection logic
    const mockAddress = "asfghnstr.yurtg435serfsd";
    setWalletAddress(mockAddress);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setWalletAddress("");
    setIsConnected(false);
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 20) return address;
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  };

  return (
    <header className="flex items-center justify-between py-4 max-w-6xl m-auto">
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {!isConnected ? (
          <Button onClick={handleConnect} variant="default">
            Connect Wallet
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded-full">
                <div className="bg-gray-800 rounded-full p-2">
                  <UserCircle className="w-6 h-6 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-300 hidden sm:block">
                  {truncateAddress(walletAddress)}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDisconnect}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
