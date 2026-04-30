"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="space-y-3 rounded border bg-white p-4">
      <p className="text-red-600">Ошибка: {error.message}</p>
      <button onClick={reset} aria-label="Повторить загрузку страницы" className="rounded border px-4 py-2">
        Повторить
      </button>
    </div>
  );
}
