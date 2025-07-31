"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! Soy el asistente de Juan Campo. ¿En qué puedo ayudarte? Puedo contarte sobre sus proyectos, habilidades técnicas, disponibilidad para freelance y más.',
      role: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.role === 'bot' ? 'assistant' : 'user',
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.',
        role: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-blue to-electric-green text-black hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-neon-blue/50 animate-pulse-glow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] animate-fade-in-up">
      {/* Chat Container */}
      <div className="relative">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#0080ff] to-[#00f0ff] rounded-2xl p-[1px] animate-pulse-glow">
          <div className="w-full h-full bg-black/90 backdrop-blur-xl rounded-2xl" />
        </div>
        
        {/* Main Chat Window */}
        <div className="relative bg-black/85 backdrop-blur-xl rounded-2xl border border-[#00f0ff]/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between h-14 px-4 bg-gradient-to-r from-[#00f0ff]/10 via-transparent to-[#00f0ff]/10 border-b border-[#00f0ff]/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-electric-green flex items-center justify-center">
                <Bot className="w-4 h-4 text-black" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Asistente de Juan</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-electric-green rounded-full animate-pulse" />
                  <span className="text-gray-400 text-xs">En línea</span>
                </div>
              </div>
            </div>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-neon-blue hover:bg-[#00f0ff]/10 transition-colors p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Container */}
          <div className="h-80 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-[#00f0ff]/20 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-neon-blue to-electric-green' 
                      : 'bg-gradient-to-r from-[#00f0ff]/20 to-[#0080ff]/20 border border-[#00f0ff]/30'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-3 h-3 text-black" />
                    ) : (
                      <Bot className="w-3 h-3 text-neon-blue" />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className="flex flex-col space-y-1">
                    <div className={`px-3 py-2 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-neon-blue to-electric-green text-black'
                        : 'bg-black/60 border border-[#00f0ff]/20 text-gray-200'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className={`text-xs text-gray-500 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-[#00f0ff]/20 to-[#0080ff]/20 border border-[#00f0ff]/30">
                    <Bot className="w-3 h-3 text-neon-blue" />
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-black/60 border border-[#00f0ff]/20">
                    <div className="flex items-center space-x-1">
                      <Loader2 className="w-3 h-3 text-neon-blue animate-spin" />
                      <span className="text-sm text-gray-400">Escribiendo...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#00f0ff]/20 p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="min-h-[40px] max-h-24 resize-none bg-black/40 border-[#00f0ff]/20 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50 rounded-xl pr-12"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-blue to-electric-green text-black hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
