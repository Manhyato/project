"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { usePrompts } from "@/lib/prompt-store";

export default function FavoritesPage() {
  const favorites = usePrompts().filter((item) => item.isFavorite);
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Избранное</h1>
      {favorites.length === 0 ? <p className="text-sm text-zinc-600 dark:text-zinc-300">Пока нет избранных шаблонов.</p> : null}
      {favorites.map((item) => (
        <article key={item.id} className="rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <h2>{item.title}</h2>
          <Link
            href={`/prompts/${item.id}`}
            className="text-sm text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
          >
            Открыть
          </Link>
        </article>
      ))}
      <Link href="/catalog" className={buttonVariants("secondary")}>
        Перейти в каталог
      </Link>
    </div>
  );
}
