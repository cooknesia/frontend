"use client";

import LoginButton from "@/components/login-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { Heart, Home, LogOut, Menu, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "../icon";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Beranda", icon: <Home className="mr-2 h-4 w-4" /> },
    {
      href: "/resep",
      label: "Jelajahi",
      icon: <Search className="mr-2 h-4 w-4" />,
    },
    {
      href: "/rekomendasi",
      label: "Rekomendasi",
      icon: <Heart className="mr-2 h-4 w-4" />,
    },
  ];

  const authNavItems = [
    {
      href: "/favorites",
      label: "Favorit",
      icon: <Heart className="mr-2 h-4 w-4" />,
    },
    {
      href: "/profile",
      label: "Profil",
      icon: <User className="mr-2 h-4 w-4" />,
    },
  ];

  const handleSheet = () => setOpen(!open);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="hidden">Menu Navigasi</SheetTitle>
              <Link
                onClick={handleSheet}
                href="/"
                className="flex items-center gap-2 mb-8"
              >
                <Icon />
                <span className="font-bold text-xl">Cooknesia</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    onClick={handleSheet}
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center text-muted-foreground hover:text-foreground transition-colors",
                      pathname === item.href && "text-foreground font-medium"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
                {user &&
                  authNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleSheet}
                      className={cn(
                        "flex items-center text-muted-foreground hover:text-foreground transition-colors",
                        pathname === item.href && "text-foreground font-medium"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                {user && (
                  <Button
                    variant="ghost"
                    className="justify-start px-2"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </Button>
                )}
                {!user && <LoginButton className="mt-2" />}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            {/* <Icon /> */}
            <span className="font-bold text-xl hidden sm:inline-block">
              Cooknesia
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium px-3 py-1 border-b-2 border-transparent hover:border-muted-foreground hover:text-foreground transition-colors",
                  pathname === item.href && "text-foreground underline underline-offset-4"
                )}
              >
                {item.label}
              </Link>
            ))}
            {user &&
              authNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium px-3 py-1 border-b-2 border-transparent hover:border-muted-foreground hover:text-foreground transition-colors",
                    pathname === item.href && "text-foreground underline underline-offset-4"
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Image
                      src={user.photo_url}
                      alt="User Avatar"
                      fill
                      className="object-cover border-2 rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Favorit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:block">
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
