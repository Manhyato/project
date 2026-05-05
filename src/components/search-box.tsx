"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSearchSuggestions } from "@/lib/prompt-service";
import { Button } from "@/components/ui/button";

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
          className="w-full rounded border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="Найти шаблон..."
        />
        <Button type="submit" variant="primary" aria-label="Запустить поиск" disabled={!query.trim()}>
          Поиск
        </Button>
      </form>

      {query.length >= 3 && suggestions.length > 0 ? (
        <ul className="rounded border border-zinc-300 bg-white p-2 text-sm dark:border-zinc-600 dark:bg-zinc-900">
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
