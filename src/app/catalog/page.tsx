"use client";

import Link from "next/link";
import { usePrompts } from "@/lib/prompt-store";

export default function CatalogPage() {
  const prompts = usePrompts().filter((item) => item.isPublic);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Каталог промптов</h1>
      <ul className="grid gap-3">
        {prompts.map((item) => (
          <li key={item.id} className="rounded border bg-white p-4">
            <h2 className="font-medium">{item.title}</h2>
            <p className="text-sm text-zinc-600">{item.description}</p>
            <Link href={`/prompts/${item.id}`} className="mt-2 inline-block text-sm underline">
              Открыть
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm">
        <Link href="/" className="underline">
          На главную
        </Link>
        <Link href="/search" className="underline">
          Перейти к поиску
        </Link>
      </div>
    </section>
  );
}
