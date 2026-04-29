"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchBox } from "@/components/search-box";
import { searchPrompts } from "@/lib/prompt-store";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const results = searchPrompts(query);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Поиск</h1>
      <SearchBox initialQuery={query} />
      <p className="text-sm text-zinc-600">Найдено: {results.length}</p>
      <ul className="space-y-3">
        {results.map((item) => (
          <li key={item.id} className="rounded border bg-white p-4">
            <h2 className="font-medium">{item.title}</h2>
            <Link href={`/prompts/${item.id}`} className="text-sm underline">
              Открыть
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm">
        <Link href="/catalog" className="underline">
          Назад в каталог
        </Link>
        <Link href="/" className="underline">
          На главную
        </Link>
      </div>
    </section>
  );
}
