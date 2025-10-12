import React from "react";
import { UserCircle } from "lucide-react";
import Logo from "./logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 max-w-6xl m-auto">
      <div className="flex items-center gap-2">
        <Logo />
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-gray-800 rounded-full p-2">
          <UserCircle className="w-6 h-6 text-gray-400" />
        </div>
        <span className="text-sm font-medium text-gray-300 hidden sm:block">
          asfghnstr.yurtg435serfsd
        </span>
      </div>
    </header>
  );
};

export default Header;
