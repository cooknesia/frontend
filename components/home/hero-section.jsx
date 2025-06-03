import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export default function Hero() {
  return (
    <section className="bg-custom-cream">
      <div className="py-12 md:py-20 container">
        <div className="grid gap-2 md:gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Temukan Cita Rasa{" "}
              <span className="text-custom-red-dark">Indonesia</span>
            </h1>
            <p className="text-xl text-foreground/80">
              Jelajahi resep otentik Indonesia dari seluruh provinsi. Masak,
              nilai, dan simpan favorit Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                asChild
                className="border-custom-red text-custom-red hover:bg-custom-red/10"
              >
                <Link href="/resep">Jelajahi Resep</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[500px] overflow-hidden rounded-lg flex items-center justify-end">
            <Image
              src="/group-cartoon.png"
              alt="Kolase Makanan Indonesia"
              fill
              className="h-full w-fit object-contain"
              priority
            />
            <div className="absolute h-[30%] bottom-0 w-full bg-gradient-to-t from-black/60  to-transparent flex flex-col justify-end p-6"> 
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
