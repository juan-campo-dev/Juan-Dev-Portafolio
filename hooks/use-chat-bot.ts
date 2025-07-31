"use client";

import { useState, useCallback } from 'react';

export const useChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    toggleChat,
    openChat,
    closeChat,
  };
};
