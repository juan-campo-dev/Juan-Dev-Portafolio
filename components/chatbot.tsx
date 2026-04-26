"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatbot, Message } from "@/hooks/use-chatbot";
import { useOverlayFocusState } from "@/components/shared/overlay-focus-provider";
import { cn } from "@/lib/utils";
import { chatbotSurface } from "@/lib/ui-system";

interface ChatBotProps {
  className?: string;
}

const formatTime = (date: Date) =>
  date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

// MessageBubble se declara FUERA del componente padre. Si lo declaras dentro,
// React lo trata como un componente nuevo en cada render y desmonta/remonta
// cada burbuja, perdiendo memoización y disparando reflow.
const MessageBubble = memo(function MessageBubble({
  message,
}: {
  message: Message;
}) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex items-start space-x-2 mb-4 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}
    >
      <div
        className={isUser ? chatbotSurface.userAvatar : chatbotSurface.botAvatar}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`max-w-[80%] ${isUser ? "text-right" : "text-left"}`}>
        <div
          className={isUser ? chatbotSurface.userBubble : chatbotSurface.botBubble}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <div className="text-xs text-gray-500 mt-1 px-2">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
});

const ChatBot: React.FC<ChatBotProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, error, sendMessage } = useChatbot();
  const { isOverlayFocused } = useOverlayFocusState();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;
    await sendMessage(inputValue);
    setInputValue("");
  }, [inputValue, isLoading, sendMessage]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 transition-[opacity,filter,transform] duration-300",
        isOverlayFocused && "pointer-events-none opacity-0 blur-sm scale-95",
        className,
      )}
      aria-hidden={isOverlayFocused}
    >
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className={chatbotSurface.trigger}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={chatbotSurface.panel}>
          {/* Header */}
          <div className={chatbotSurface.header}>
            <div className="flex items-center space-x-3">
              <div className={chatbotSurface.botAvatar}>
                <Bot className="w-4 h-4 text-[#00f0ff]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Asistente de Juan
                </h3>
                <p className="text-xs text-gray-400">Siempre disponible</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className={chatbotSurface.iconButton}
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className={chatbotSurface.botAvatar}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm">
                Error: {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#00f0ff]/20 p-4">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className={chatbotSurface.input}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="h-10 w-10 flex-shrink-0 rounded-full bg-neon-blue text-black transition-colors hover:bg-electric-green disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
