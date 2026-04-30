"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSearchSuggestions } from "@/lib/prompt-service";

type SearchBoxProps = {
  initialQuery?: string;
};

export function SearchBox({ initialQuery = "" }: SearchBoxProps) {
  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    const handle = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(handle);
  }, [query]);

  const suggestions = useMemo(() => getSearchSuggestions(debounced), [debounced]);

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      router.push(`/search?query=${encodeURIComponent(query)}`);
    },
    [query, router],
  );

  return (
    <div className="space-y-2">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Поисковый запрос"
          className="w-full rounded border px-3 py-2"
          placeholder="Найти шаблон..."
        />
        <button
          type="submit"
          aria-label="Запустить поиск"
          className="rounded bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 active:bg-black disabled:bg-zinc-400"
          disabled={!query.trim()}
        >
          Поиск
        </button>
      </form>

      {query.length >= 3 && suggestions.length > 0 ? (
        <ul className="rounded border bg-white p-2 text-sm">
          {suggestions.map((suggestion) => (
            <li key={suggestion} className="py-1">
              {suggestion}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
