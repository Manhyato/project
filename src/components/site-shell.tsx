"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-store";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/knowledge", label: "База знаний" },
  { href: "/research", label: "Исследования" },
  { href: "/profile", label: "Профиль" },
  { href: "/login", label: "Вход" },
];

export function Header() {
  const router = useRouter();
  const { role, isAuthor, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          PromptHub
        </Link>
        <nav aria-label="Основная навигация" className="flex items-center gap-4 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} aria-label={link.label} className="hover:underline">
              {link.label}
            </Link>
          ))}
          {mounted && isAuthor ? (
            <Link href="/create" aria-label="Создать шаблон" className="rounded border px-2 py-1">
              Создать
            </Link>
          ) : null}
          <span className="text-zinc-500">
            {mounted ? (role === "author" ? "Роль: автор" : "Роль: гость") : "Роль: ..."}
          </span>
          {mounted && isAuthor ? (
            <button onClick={handleLogout} aria-label="Выйти из аккаунта" className="rounded border px-2 py-1">
              Выйти
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-zinc-500">
        Учебный проект PromptHub • Next.js App Router
      </div>
    </footer>
  );
}
