"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchBox } from "@/components/search-box";
import { buttonVariants } from "@/components/ui/button";
import { searchPrompts } from "@/lib/prompt-store";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const results = searchPrompts(query);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Поиск</h1>
      <SearchBox initialQuery={query} />
      <p className="text-sm text-zinc-600 dark:text-zinc-300">Найдено: {results.length}</p>
      <ul className="space-y-3">
        {results.map((item) => (
          <li key={item.id} className="rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="font-medium">{item.title}</h2>
            <Link
              href={`/prompts/${item.id}`}
              className="text-sm text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
            >
              Открыть
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm">
        <Link href="/catalog" className={buttonVariants("secondary")}>
          Назад в каталог
        </Link>
        <Link href="/" className={buttonVariants("secondary")}>
          На главную
        </Link>
      </div>
    </section>
  );
}
