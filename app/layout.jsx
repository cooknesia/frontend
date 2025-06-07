import "@/app/globals.css";
import { Chatbot } from "@/components/chatbot";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context";
import { ChatbotProvider } from "@/context/chatbot-context";
import { Inter } from "next/font/google";
import PWARegister from "./pwa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cooknesia - Platform Resep Nusantara",
  description:
    "Temukan berbagai resep masakan khas Indonesia dari seluruh provinsi. Cooknesia hadir untuk membantu Anda memasak masakan nusantara dengan mudah dan praktis.",
  keywords: [
    "resep",
    "masakan",
    "kuliner",
    "Indonesia",
    "resep Indonesia",
    "masakan Indonesia",
    "kuliner Indonesia",
    "resep nusantara",
    "masakan nusantara",
  ],
  authors: [{ name: "Cooknesia Team", url: "https://cooknesia.xyz" }],
  creator: "Cooknesia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Cooknesia - Platform Resep Nusantara",
    description:
      "Temukan berbagai resep masakan khas Indonesia dari seluruh provinsi. Cooknesia hadir untuk membantu Anda memasak masakan nusantara dengan mudah dan praktis.",
    url: "https://cooknesia.xyz",
    siteName: "Cooknesia",
    images: [
      {
        url: "https://cooknesia.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cooknesia Logo",
        type: "image/png",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooknesia - Platform Resep Nusantara",
    description:
      "Temukan berbagai resep masakan khas Indonesia dari seluruh provinsi. Cooknesia hadir untuk membantu Anda memasak masakan nusantara dengan mudah dan praktis.",
    site: "@cooknesia",
    creator: "@cooknesia",
    images: ["https://cooknesia.example.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ChatbotProvider>
            <div className="flex min-h-screen flex-col relative">
              <Header />
              <main className="flex-1">{children}</main>
              <PWARegister/>
              <Chatbot />
            </div>
            <Toaster />
          </ChatbotProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
