"use client"

import ChatbotSection from "@/components/home/chatbot-section"
import Hero from "@/components/home/hero-section"
import { ProvinceScroll } from "@/components/home/province-scroll"
import { PopularRecipes } from "@/components/popular-recipes"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChefHat, Heart, Star } from "lucide-react"
import { nanoid } from "nanoid"
import Link from "next/link"

export default function Home() {
  return (
    <div className="mx-auto pb-8">
      <Hero />
      <ChatbotSection />

      <section className="container py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Jelajahi 38 Provinsi Indonesia
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Cooknesia menampilkan resep otentik dari setiap provinsi di
            Indonesia, menunjukkan kekayaan keragaman kuliner nusantara.
          </p>
        </div>

        <ProvinceScroll />

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            asChild
            className="border-custom-red text-custom-red hover:bg-custom-red/10"
          >
            <Link href="/resep">Jelajahi Masakan Daerah</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 container">
        <h2 className="text-3xl font-bold text-center mb-8">
          Mengapa Memilih Cooknesia?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Resep Otentik",
              description:
                "Temukan resep tradisional dari seluruh provinsi Indonesia",
              icon: <ChefHat className="h-10 w-10 text-primary" />,
            },
            {
              title: "Simpan Favorit",
              description:
                "Buat koleksi pribadi hidangan Indonesia favorit Anda",
              icon: <Heart className="h-10 w-10 text-primary" />,
            },
            {
              title: "Nilai & Ulas",
              description:
                "Bagikan pengalaman Anda dan bantu orang lain menemukan resep lezat",
              icon: <Star className="h-10 w-10 text-primary" />,
            },
          ].map((feature) => (
            <Card key={nanoid()} className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Resep Populer</h2>
          <Button variant="ghost" asChild>
            <Link href="/resep">Lihat Semua</Link>
          </Button>
        </div>
        <PopularRecipes />
      </section>
    </div>
  )
}
