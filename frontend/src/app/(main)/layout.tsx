import ChatbotPopup from "@/components/message-popup/MessagePopUp";
import Navbar from "@/components/navbar/Navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <ChatbotPopup/>
      {children}
    </>
  );
};

export default HomeLayout;
