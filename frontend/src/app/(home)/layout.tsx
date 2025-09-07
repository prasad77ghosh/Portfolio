import Navbar from "@/components/navbar/Navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="min-h-screen flex flex-col">
    //   <Navbar />
    //   <main className="flex-1">{children}</main>
    // </div>
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default HomeLayout;
