"use client";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, User, Minimize2, Maximize2, Mail } from "lucide-react";

// Enhanced TypeScript Interfaces
interface Message {
  id: string;
  text: string;
  sender: "user" | "owner";
  timestamp: Date;
}

interface ChatHeaderProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

interface MessageBubbleProps {
  message: Message;
}

interface MessageInputProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

interface FloatingButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

// Modular Components

// Floating Chat Button Component
const FloatingButton = memo(({ isOpen, onClick }: FloatingButtonProps) => (
  <motion.button
    className="fixed bottom-12 right-10 z-50"
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ scale: 0, rotate: -180, opacity: 0 }}
    animate={{ scale: isOpen ? 0 : 1, rotate: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <div className="relative">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>

      {/* Enhanced Pulse Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full -z-10"
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0.2, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Notification Badge */}
      <motion.div
        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        1
      </motion.div>
    </div>
  </motion.button>
));

FloatingButton.displayName = 'FloatingButton';

// Contact Header Component
const ChatHeader = memo(({ isMinimized, onToggleMinimize, onClose }: ChatHeaderProps) => (
  <motion.div
    className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-4 flex items-center justify-between cursor-pointer"
    layoutId="chatHeader"
  >
    <div className="flex items-center space-x-3">
      <motion.div
        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Mail className="w-6 h-6 text-white" />
      </motion.div>
      <div>
        <h3 className="text-white font-semibold text-lg">Talk to Me</h3>
        <div className="flex items-center space-x-1">
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-white/90 text-sm">Available</span>
        </div>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <motion.button
        onClick={onToggleMinimize}
        className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
      </motion.button>
      <motion.button
        onClick={onClose}
        className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X size={20} />
      </motion.button>
    </div>
  </motion.div>
));

ChatHeader.displayName = 'ChatHeader';

// Message Bubble Component
const MessageBubble = memo(({ message }: MessageBubbleProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 500, damping: 25 }}
    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`flex items-start space-x-2 max-w-[85%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
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
          <Mail className="w-4 h-4 text-white" />
        )}
      </motion.div>

      {/* Message Bubble */}
      <motion.div
        className={`rounded-2xl px-4 py-3 ${
          message.sender === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground shadow-md border border-border"
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
      </motion.div>
    </div>
  </motion.div>
));

MessageBubble.displayName = 'MessageBubble';

// Message Input Component with Perfect Alignment
const MessageInput = memo(({ inputText, onInputChange, onSendMessage, onKeyPress }: MessageInputProps) => (
  <div className="p-4 bg-card border-t border-border">
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyPress}
            placeholder="Write your message here..."
            className="w-full px-4 py-3 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-background text-foreground h-12 transition-all duration-200"
            maxLength={1000}
          />
        </div>
        {/* <div className="text-xs text-muted-foreground mt-1 text-right">
          {inputText.length}/1000
        </div> */}
      </div>
      <motion.button
        onClick={onSendMessage}
        disabled={!inputText.trim() || inputText.length > 1000}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200 flex-shrink-0 h-12 w-12 flex items-center justify-center"
        whileHover={{
          scale: inputText.trim() && inputText.length <= 1000 ? 1.05 : 1,
          boxShadow: inputText.trim() && inputText.length <= 1000 ? "0 10px 25px rgba(168, 85, 247, 0.3)" : "none"
        }}
        whileTap={{ scale: inputText.trim() && inputText.length <= 1000 ? 0.95 : 1 }}
      >
        <Send size={18} />
      </motion.button>
    </div>
  </div>
));

MessageInput.displayName = 'MessageInput';

const ContactPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 Thanks for reaching out. I'd love to hear from you! What's on your mind?",
      sender: "owner",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Personalized auto-responses
  const autoResponses = React.useMemo(() => [
    "Thanks for your message! I'll get back to you soon. 😊",
    "I appreciate you reaching out! I'll respond as quickly as possible. 🚀",
    "Great to hear from you! I'll review your message and reply shortly. ✨",
    "Thank you for contacting me! I'll get back to you within 24 hours. 📩",
    "Your message has been received! I'm excited to connect with you. 🤝",
    "Thanks for getting in touch! I'll make sure to respond soon. 💫",
  ], []);

  // Optimized scroll function
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Simulate auto-response (in real app, this would send to backend)
  const sendAutoResponse = useCallback((responseText: string) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: responseText,
          sender: "owner",
          timestamp: new Date(),
        },
      ]);
    }, 1500); // Simulate response delay
  }, []);


  // Optimized handlers
  const handleSendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Send auto-response
    const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
    sendAutoResponse(randomResponse);
  }, [inputText, autoResponses, sendAutoResponse]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  }, [isOpen]);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  return (
    <>
      {/* Enhanced Chat Button */}
      <FloatingButton isOpen={isOpen} onClick={toggleChat} />

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 2px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }

        /* Hide scrollbar for input elements */
        input::-webkit-scrollbar,
        textarea::-webkit-scrollbar {
          display: none;
        }
        input,
        textarea {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Enhanced Chat Window with Increased Dimensions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[28rem] h-[42rem] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)] flex flex-col"
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? 60 : "42rem",
              width: isMinimized ? "28rem" : "28rem"
            }}
            exit={{ opacity: 0, scale: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden h-full backdrop-blur-sm">
              {/* Header */}
              <ChatHeader
                isMinimized={isMinimized}
                onToggleMinimize={toggleMinimize}
                onClose={toggleChat}
              />

              {/* Enhanced Messages + Input */}
              {!isMinimized && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Messages Container with Better Scrolling */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-muted/30 to-muted/50 custom-scrollbar">
                    {messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center text-muted-foreground text-sm py-4"
                      >
                        💬 Start a conversation by typing below
                      </motion.div>
                    )}
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Enhanced Input Section */}
                  <MessageInput
                    inputText={inputText}
                    onInputChange={setInputText}
                    onSendMessage={handleSendMessage}
                    onKeyPress={handleKeyPress}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactPopup;
