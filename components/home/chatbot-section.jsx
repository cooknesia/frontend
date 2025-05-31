"use client";

import { useChatbot } from "@/context/chatbot-context";
import { MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function ChatbotSection() {
  const { openChatbot } = useChatbot();
  return (
    <section className="container py-12 px-2 bg-custom-blue/20 rounded-xl my-12">
      <div className="container mx-auto md:px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Asisten Resep Berbasis AI</h2>
            <p className="text-lg">
              Chatbot cerdas kami membantu Anda menemukan resep berdasarkan
              bahan-bahan yang sudah ada di rumah.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-custom-red text-white p-1 mt-0.5">
                  •
                </span>
                <span>
                  Cukup ketik bahan-bahan Anda (mis. tepung, masako, air)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-custom-red text-white p-1 mt-0.5">
                  •
                </span>
                <span>Dapatkan rekomendasi resep secara instan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-custom-red text-white p-1 mt-0.5">
                  •
                </span>
                <span>
                  Klik resep apa saja untuk melihat petunjuk detailnya
                </span>
              </li>
            </ul>
            <Button
              className="mt-2 bg-custom-red hover:bg-custom-red-light"
              onClick={() => openChatbot()}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Coba Chatbot
            </Button>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden border-2 shadow-lg">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            /> 
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6"> 
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
