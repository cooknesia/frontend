"use client"

import { useToast } from "@/hooks/use-toast"
import { Facebook, Link, Share2, Twitter } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ToastAction } from "../ui/toast"

export default function ShareButtons({ recipeName }) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const shareData = {
    title: recipeName,
    text: `Lihat resep ${recipeName}`,
    url: shareUrl,
  }

  const handleShare = async (platform) => {
    setIsOpen(false)

    switch (platform) {
      case "native":
        if (navigator.share) {
          try {
            await navigator.share(shareData)
            console.log("Shared successfully")
          } catch (err) {
            console.log("Error sharing:", err)
          }
        } else {
          copyToClipboard()
        }
        break
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank"
        )
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareData.text
          )}&url=${encodeURIComponent(shareUrl)}`,
          "_blank"
        )
        break
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareData.text} ${shareUrl}`)}`,
          "_blank"
        )
        break
      case "copy":
        copyToClipboard()
        break
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        toast({
          title: "Link disalin!",
          description: "Link resep telah disalin ke clipboard.",
          action: <ToastAction altText="Tutup">Tutup</ToastAction>,
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
      }
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          aria-label="Share recipe"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {typeof navigator !== "undefined" && navigator.share && (
          <DropdownMenuItem onClick={() => handleShare("native")}>
            <Share2 className="mr-2 h-4 w-4" />
            <span>Bagikan</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <Facebook className="mr-2 h-4 w-4" />
          <span>Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="mr-2 h-4 w-4" />
          <span>Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
            <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
            <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
            <path d="M9.5 13.5c.5 1 1.5 1 2 1s1.5 0 2-1" />
          </svg>
          <span>WhatsApp</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("copy")}>
          <Link className="mr-2 h-4 w-4" />
          <span>Salin Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
