import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return ( 
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4 fixed left-0 top-0 right-0 bottom-0 z-[1000]">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Icon />
            </div>
            <h1 className="text-6xl font-bold text-orange-500 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Halaman Tidak Ditemukan!
            </h2>
            <p className="text-gray-600 mb-6">
              Maaf, halaman yang Anda cari tidak dapat ditemukan.
            </p>
          </div>

          <div className="space-y-3"> 

            <Button
              asChild
              variant="outline"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              <Link href="/" className="text-white hover:text-white">
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
