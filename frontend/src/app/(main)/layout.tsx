import ChatbotPopup from "@/components/global/message-popup/MessagePopUp";
import Navbar from "@/components/global/navbar/Navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ChatbotPopup />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default HomeLayout;
