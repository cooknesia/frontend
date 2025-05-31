"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChatbot } from "@/context/chatbot-context";
import { cn } from "@/lib/utils";
import { MessageCircle, Send, X } from "lucide-react";
import { nanoid } from "nanoid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Icon from "./icon";

export function Chatbot() {
  const {
    isOpen,
    toggleChatbot,
    closeChatbot,
    messages,
    inputValue,
    isLoading,
    handleInputChange,
    handleSendMessage,
  } = useChatbot();

  const messagesEndRef = useRef(null);
  const router = useRouter();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  const navigateToRecipe = (recipeId) => {
    router.push(`/resep/${recipeId}`);
    closeChatbot();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-[350px] md:w-[400px] shadow-lg">
          <CardHeader className="bg-primary text-primary-foreground py-3 px-4 flex flex-row justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon />
              Asisten Cooknesia
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChatbot}
              className="text-primary-foreground h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 h-[350px] overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={nanoid()}
                  className={cn(
                    "flex",
                    message.type === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-3",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/20 text-foreground"
                    )}
                  >
                    <p>{message.content}</p>
                    {message.recommendations &&
                      message.recommendations.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.recommendations.map((recipe) => (
                            <Card
                              key={recipe.id}
                              className="overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
                              onClick={() => navigateToRecipe(recipe.id)}
                            >
                              <div className="flex items-center p-2">
                                <div className="relative h-12 w-12 flex-shrink-0">
                                  <Image
                                    src={recipe.image_url}
                                    alt={recipe.name}
                                    fill
                                    className="object-cover rounded-md"
                                  />
                                </div>
                                <div className="ml-3 flex-1 overflow-hidden">
                                  <p className="font-medium line-clamp-1">
                                    {recipe.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground line-clamp-1">
                                    {recipe.description}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary/20 text-foreground max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-2 border-t">
            <div className="flex w-full gap-2 relative">
              <Input
                placeholder="Masukkan bahan (mis. tepung, masako, air)"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={toggleChatbot}
          className="h-14 w-14 border border-white rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
