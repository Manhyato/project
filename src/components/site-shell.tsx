"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { Button, buttonVariants } from "@/components/ui/button";

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
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="border-b bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-zinc-900 dark:text-zinc-100">
          PromptHub
        </Link>
        <nav aria-label="Основная навигация" className="flex items-center gap-4 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className="text-zinc-700 transition hover:text-black dark:text-zinc-300 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          {mounted && isAuthor ? (
            <Link
              href="/create"
              aria-label="Создать шаблон"
              className={buttonVariants("secondary")}
            >
              Создать
            </Link>
          ) : null}
          <span className="text-zinc-600 dark:text-zinc-300">
            {mounted ? (role === "author" ? "Роль: автор" : "Роль: гость") : "Роль: ..."}
          </span>
          {mounted && isAuthor ? (
            <Button
              onClick={handleLogout}
              variant="secondary"
              aria-label="Выйти из аккаунта"
            >
              Выйти
            </Button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-4 text-sm text-zinc-500 dark:text-zinc-300">
        Учебный проект PromptHub • Next.js App Router
      </div>
    </footer>
  );
}
