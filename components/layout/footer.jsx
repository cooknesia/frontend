import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Icon from "../icon";

export default function Footer() {
  return (
    <footer className="border-t bg-custom-red text-white">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Icon />
              <span className="font-bold text-xl">Cooknesia</span>
            </Link>
            <p className="text-sm">
              Temukan resep otentik Indonesia dari seluruh provinsi.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Jelajahi</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resep"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Semua Resep
                </Link>
              </li> 
              <li>
                <Link
                  href="/rekomendasi"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Rekomendasi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Akun</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Favorit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Syarat Layanan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Cooknesia. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
