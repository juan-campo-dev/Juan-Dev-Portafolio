"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Trash2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatbot, Message } from '@/hooks/use-chatbot';

interface ChatBotProps {
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, isLoading, error, sendMessage, clearChat } = useChatbot();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.role === 'user';
    
    return (
      <div className={`flex items-start space-x-2 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
          isUser 
            ? 'bg-[#00f0ff]/20 border-[#00f0ff]/30 text-[#00f0ff]' 
            : 'bg-black/60 border-[#00f0ff]/20 text-white'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>
        
        <div className={`max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`inline-block px-4 py-2 rounded-2xl border ${
            isUser
              ? 'bg-[#00f0ff]/10 border-[#00f0ff]/30 text-white'
              : 'bg-black/60 border-[#00f0ff]/20 text-gray-300'
          }`}>
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
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#00f0ff] to-[#0080ff] hover:from-[#00f0ff]/80 hover:to-[#0080ff]/80 text-black shadow-lg hover:shadow-xl transition-all duration-300 border border-[#00f0ff]/30"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[500px] bg-black/90 backdrop-blur-xl rounded-2xl border border-[#00f0ff]/20 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between h-14 px-4 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-[#00f0ff]/10 border-b border-[#00f0ff]/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#00f0ff]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Asistente de Juan</h3>
                <p className="text-xs text-gray-400">Siempre disponible</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={clearChat}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 p-1 rounded-full transition-all duration-300"
                title="Limpiar chat"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-red-500 hover:bg-red-500/10 p-1 rounded-full transition-all duration-300"
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
                <div className="w-8 h-8 rounded-full bg-black/60 border border-[#00f0ff]/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#00f0ff] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                className="flex-1 bg-black/60 border border-[#00f0ff]/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#00f0ff] transition-colors text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-[#00f0ff] hover:bg-[#00f0ff]/80 text-black disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
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
