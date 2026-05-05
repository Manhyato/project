"use client";

import Link from "next/link";
import { usePrompts } from "@/lib/prompt-store";
import { buttonVariants } from "@/components/ui/button";

export default function CatalogPage() {
  const prompts = usePrompts().filter((item) => item.isPublic);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Каталог промптов</h1>
      <ul className="grid gap-3">
        {prompts.map((item) => (
          <li key={item.id} className="rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="font-medium">{item.title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{item.description}</p>
            <Link
              href={`/prompts/${item.id}`}
              className="mt-2 inline-block text-sm text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
            >
              Открыть
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm">
        <Link href="/" className={buttonVariants("secondary")}>
          На главную
        </Link>
        <Link href="/search" className={buttonVariants("secondary")}>
          Перейти к поиску
        </Link>
      </div>
    </section>
  );
}
