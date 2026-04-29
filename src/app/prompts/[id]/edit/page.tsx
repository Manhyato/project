"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PromptForm } from "@/components/prompt-form";
import { canEdit } from "@/lib/auth";
import { usePrompts } from "@/lib/prompt-store";

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const prompt = usePrompts().find((item) => item.id === id);

  if (!prompt) {
    return (
      <div className="space-y-2">
        <p>Шаблон не найден.</p>
        <Link href="/catalog" className="underline">
          В каталог
        </Link>
      </div>
    );
  }

  if (!canEdit(prompt.authorId)) {
    return (
      <div className="space-y-2">
        <p>Редактирование доступно только автору шаблона.</p>
        <Link href={`/prompts/${prompt.id}`} className="underline">
          Вернуться к шаблону
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Редактирование</h1>
      <PromptForm mode="edit" initialValues={prompt} />
      <Link href={`/prompts/${prompt.id}`} className="underline">
        Назад к шаблону
      </Link>
    </section>
  );
}
