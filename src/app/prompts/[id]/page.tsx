"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AUTHOR_ID, canEdit } from "@/lib/auth";
import { createPrompt, toggleFavorite, usePrompts } from "@/lib/prompt-store";
import { highlightPromptSyntax } from "@/components/prompt-editor";
import { Button, buttonVariants } from "@/components/ui/button";

export default function PromptPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const prompts = usePrompts();
  const prompt = prompts.find((item) => item.id === id);
  const [copyMessage, setCopyMessage] = useState("");
  const highlightedContent = useMemo(() => (prompt ? highlightPromptSyntax(prompt.content) : ""), [prompt]);

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

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopyMessage("Скопировано");
      setTimeout(() => setCopyMessage(""), 1600);
    } catch {
      setCopyMessage("Не удалось скопировать");
      setTimeout(() => setCopyMessage(""), 1600);
    }
  };

  return (
    <article className="space-y-4 rounded border border-zinc-300 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold">{prompt.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-300">{prompt.description}</p>
      <pre className="prompt-preview overflow-x-auto rounded bg-zinc-100 p-3 text-sm whitespace-pre-wrap dark:bg-zinc-800">
        <code
          dangerouslySetInnerHTML={{
            __html: highlightedContent,
          }}
        />
      </pre>
      <div className="flex flex-wrap gap-3">
        {editable ? (
          <Link
            href={`/prompts/${prompt.id}/edit`}
            aria-label="Редактировать шаблон"
            className={buttonVariants("secondary")}
          >
            Редактировать
          </Link>
        ) : (
          <Button onClick={handleCreateCopy} variant="secondary" aria-label="Создать копию шаблона">
            Создать копию
          </Button>
        )}
        <Button onClick={handleCopyToClipboard} variant="secondary" aria-label="Скопировать текст промпта">
          Копировать
        </Button>
        <Button onClick={() => toggleFavorite(prompt.id)} variant="secondary" aria-label="Переключить избранное">
          {prompt.isFavorite ? "Убрать из избранного" : "В избранное"}
        </Button>
        <Link href="/catalog" aria-label="Вернуться в каталог" className={buttonVariants("secondary")}>
          Назад в каталог
        </Link>
        <Link
          href="/profile/my-templates"
          aria-label="Перейти в мои шаблоны"
          className={buttonVariants("secondary")}
        >
          В мои шаблоны
        </Link>
      </div>
      {copyMessage ? (
        <p role="status" className="text-sm text-emerald-700 dark:text-emerald-400">
          {copyMessage}
        </p>
      ) : null}
    </article>
  );
}
