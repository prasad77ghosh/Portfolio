"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  typing?: boolean;
}

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! 👋 I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botResponses = [
    "That's a great question! Let me help you with that. 🤔",
    "I'd be happy to assist you! Here's what I think... ✨",
    "Interesting! Based on what you've shared, I suggest... 💡",
    "Thanks for asking! Here's my recommendation... 🚀",
    "I understand your concern. Let me provide some insights... 🎯",
    "Great point! Here's how I can help you with that... 🌟",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (responseText: string) => {
    setIsTyping(true);
    const typingId = Date.now().toString();

    setMessages((prev) => [
      ...prev,
      { id: typingId, text: "", sender: "bot", timestamp: new Date(), typing: true },
    ]);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== typingId).concat({
          id: Date.now().toString(),
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
        })
      );
    }, 900); // Faster typing animation
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    simulateTyping(randomResponse);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-12 right-10 z-50"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>

          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full -z-10"
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Notification Badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            1
          </motion.div>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] flex flex-col"
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0, height: isMinimized ? 60 : 500 }}
            exit={{ opacity: 0, scale: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden h-full">
              {/* Header */}
              <motion.div
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-4 flex items-center justify-between cursor-pointer"
                layoutId="chatHeader"
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <Bot className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">AI Assistant</h3>
                    <div className="flex items-center space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-white/90 text-sm">Online</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={toggleMinimize}
                    className="text-white/80 hover:text-white p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
                  </motion.button>
                  <motion.button
                    onClick={toggleChat}
                    className="text-white/80 hover:text-white p-1"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </motion.div>

              {/* Messages + Input */}
              {!isMinimized && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[80%] ${
                            message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          {/* Avatar */}
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === "user"
                                ? "bg-primary"
                                : "bg-gradient-to-r from-purple-500 to-pink-500"
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {message.sender === "user" ? (
                              <User className="w-4 h-4 text-primary-foreground" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </motion.div>

                          {/* Message Bubble */}
                          <motion.div
                            className={`rounded-2xl px-4 py-2 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-card text-card-foreground shadow-md border border-border"
                            }`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            {message.typing ? (
                              <motion.div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-muted-foreground rounded-full"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                                  />
                                ))}
                              </motion.div>
                            ) : (
                              <p className="text-sm">{message.text}</p>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-card border-t border-border">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="flex-1 mt-0.5">
                        <textarea
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Type your message..."
                          className="w-full px-4 py-3 pr-12 border border-input rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground max-h-32"
                          rows={1}
                          disabled={isTyping}
                        />
                      </div>
                      <motion.button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isTyping}
                        className="mb-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Send size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotPopup;
