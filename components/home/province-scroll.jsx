"use client"

import { Card, CardContent } from "@/components/ui/card"
import provinces from "@/data/provinces"
import { cn } from "@/lib/utils"
import { nanoid } from "nanoid"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function ProvinceScroll() {
  const scrollRef = useRef(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId;
    let scrollPosition = 0
    const scrollSpeed = 0.5
    const containerWidth = scrollContainer.scrollWidth
    const viewportWidth = scrollContainer.offsetWidth

    const scroll = () => {
      if (!scrollContainer) return

      scrollPosition += scrollSpeed
      if (scrollPosition >= containerWidth / 2) {
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId)
    }

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  const displayProvinces = [...provinces, ...provinces]

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex gap-4 min-w-max">
          {displayProvinces.map((province) => (
            <Link className="cursor-pointer" key={nanoid()} href={`/resep?province=${province.id}`}>
            
            <Card
              key={nanoid()}
              className={cn(
                "min-w-[180px] border-2 border-custom-red",
              )}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <img
                  src={`/provisi-icons/${province.src}`}
                  alt={province.title}
                  className="w-12 h-12"
                />
                <span className="font-medium">{province.title}</span>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
