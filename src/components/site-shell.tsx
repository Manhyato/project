import Link from "next/link";
import { canCreate, CURRENT_USER } from "@/lib/auth";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/catalog", label: "Каталог" },
  { href: "/knowledge", label: "База знаний" },
  { href: "/research", label: "Исследования" },
  { href: "/profile", label: "Профиль" },
];

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold">
          PromptHub
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
          {canCreate() ? (
            <Link href="/create" className="rounded border px-2 py-1">
              Создать
            </Link>
          ) : null}
          <span className="text-zinc-500">{CURRENT_USER.role === "author" ? "Роль: автор" : "Роль: гость"}</span>
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
