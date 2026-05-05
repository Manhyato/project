"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AUTHOR_ID } from "@/lib/auth";
import { usePrompts } from "@/lib/prompt-store";

export default function MyTemplatesPage() {
  const prompts = usePrompts().filter((item) => item.authorId === AUTHOR_ID);
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Мои шаблоны</h1>
      {prompts.length === 0 ? (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Пока нет шаблонов. Создайте первый в разделе &quot;Создание&quot;.</p>
      ) : null}
      {prompts.map((item) => (
        <article key={item.id} className="rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <h2>{item.title}</h2>
          <div className="flex gap-3 text-sm">
            <Link
              href={`/prompts/${item.id}`}
              className="text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
            >
              Открыть
            </Link>
            <Link
              href={`/prompts/${item.id}/edit`}
              className="text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
            >
              Редактировать
            </Link>
          </div>
        </article>
      ))}
      <Link href="/create" className={buttonVariants("secondary")}>
        Создать новый шаблон
      </Link>
    </div>
  );
}
