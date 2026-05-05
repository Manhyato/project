"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="space-y-3 rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-red-600">Ошибка: {error.message}</p>
      <Button onClick={reset} variant="secondary" aria-label="Повторить загрузку страницы">
        Повторить
      </Button>
    </div>
  );
}
