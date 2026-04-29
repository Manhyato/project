"use client";

import Link from "next/link";
import { usePrompts } from "@/lib/prompt-store";

export default function FavoritesPage() {
  const favorites = usePrompts().filter((item) => item.isFavorite);
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Избранное</h1>
      {favorites.length === 0 ? <p className="text-sm text-zinc-600">Пока нет избранных шаблонов.</p> : null}
      {favorites.map((item) => (
        <article key={item.id} className="rounded border bg-white p-4">
          <h2>{item.title}</h2>
          <Link href={`/prompts/${item.id}`} className="text-sm underline">
            Открыть
          </Link>
        </article>
      ))}
      <Link href="/catalog" className="inline-block underline">
        Перейти в каталог
      </Link>
    </div>
  );
}
