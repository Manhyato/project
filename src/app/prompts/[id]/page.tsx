"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AUTHOR_ID, canEdit } from "@/lib/auth";
import { createPrompt, toggleFavorite, usePrompts } from "@/lib/prompt-store";

export default function PromptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const prompts = usePrompts();
  const prompt = prompts.find((item) => item.id === id);

  if (!prompt) {
    return (
      <div className="space-y-3 rounded border bg-white p-4">
        <p>Промпт не найден.</p>
        <Link href="/catalog" className="underline">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const editable = canEdit(prompt.authorId);

  const handleCreateCopy = () => {
    const created = createPrompt({
      ...prompt,
      title: `${prompt.title} (копия)`,
      authorId: AUTHOR_ID,
      isFavorite: false,
    });
    router.push(`/prompts/${created.id}`);
  };

  return (
    <article className="space-y-4 rounded border bg-white p-5">
      <h1 className="text-2xl font-semibold">{prompt.title}</h1>
      <p className="text-zinc-600">{prompt.description}</p>
      <pre className="overflow-x-auto rounded bg-zinc-100 p-3 text-sm whitespace-pre-wrap">{prompt.content}</pre>
      <div className="flex flex-wrap gap-3">
        {editable ? (
          <Link href={`/prompts/${prompt.id}/edit`} aria-label="Редактировать шаблон" className="rounded border px-4 py-2">
            Редактировать
          </Link>
        ) : (
          <button onClick={handleCreateCopy} aria-label="Создать копию шаблона" className="rounded border px-4 py-2">
            Создать копию
          </button>
        )}
        <button onClick={() => toggleFavorite(prompt.id)} aria-label="Переключить избранное" className="rounded border px-4 py-2">
          {prompt.isFavorite ? "Убрать из избранного" : "В избранное"}
        </button>
        <Link href="/catalog" aria-label="Вернуться в каталог" className="rounded border px-4 py-2">
          Назад в каталог
        </Link>
        <Link href="/profile/my-templates" aria-label="Перейти в мои шаблоны" className="rounded border px-4 py-2">
          В мои шаблоны
        </Link>
      </div>
    </article>
  );
}
