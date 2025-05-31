"use client";

import { useToast } from "@/hooks/use-toast";
import { getRecomendationFoods } from "@/lib/api/api";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth-context";

const ChatbotContext = createContext(undefined);

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Halo! Saya asisten Cooknesia. Beritahu saya bahan-bahan yang Anda miliki (pisahkan dengan koma), dan saya akan merekomendasikan resep untuk Anda!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const openChatbot = () => setIsOpen(true);
  const closeChatbot = () => setIsOpen(false);
  const toggleChatbot = () => setIsOpen((prev) => !prev);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input kosong",
        description: "Silakan masukkan beberapa bahan",
        variant: "destructive",
      });
      return;
    }

    const userMessage = {
      type: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const ingredientNames = inputValue
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const { data } = await getRecomendationFoods(ingredientNames, user?.id);

      if (data && data.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: `Berikut resep yang bisa Anda buat dengan ${inputValue}:`,
            recommendations: data,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content:
              "Saya tidak dapat menemukan bahan-bahan tersebut dalam database kami. Silakan coba bahan lain.",
          },
        ]);
      }
    } catch (error) {
      console.error("Gagal mendapatkan rekomendasi:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "Maaf, saya tidak bisa mendapatkan rekomendasi saat ini. Silakan coba lagi nanti.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        openChatbot,
        closeChatbot,
        toggleChatbot,
        messages,
        setMessages,
        inputValue,
        setInputValue,
        isLoading,
        handleInputChange,
        handleSendMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error("useChatbot harus digunakan di dalam ChatbotProvider");
  }
  return context;
}
