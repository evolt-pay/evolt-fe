import Header from "@evolt/components/common/Header";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-5">
      <Header />
      {children}
    </div>
  );
}
