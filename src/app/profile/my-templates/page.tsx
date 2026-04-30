"use client";

import Link from "next/link";
import { AUTHOR_ID } from "@/lib/auth";
import { usePrompts } from "@/lib/prompt-store";

export default function MyTemplatesPage() {
  const prompts = usePrompts().filter((item) => item.authorId === AUTHOR_ID);
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Мои шаблоны</h1>
      {prompts.length === 0 ? (
        <p className="text-sm text-zinc-600">Пока нет шаблонов. Создайте первый в разделе &quot;Создание&quot;.</p>
      ) : null}
      {prompts.map((item) => (
        <article key={item.id} className="rounded border bg-white p-4">
          <h2>{item.title}</h2>
          <div className="flex gap-3 text-sm">
            <Link href={`/prompts/${item.id}`}>Открыть</Link>
            <Link href={`/prompts/${item.id}/edit`}>Редактировать</Link>
          </div>
        </article>
      ))}
      <Link href="/create" className="inline-block underline">
        Создать новый шаблон
      </Link>
    </div>
  );
}
