"use client";

import Link from "next/link";
import { PromptForm } from "@/components/prompt-form";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-store";

export default function CreatePage() {
  const { isAuthor } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Создание шаблона</h1>
        <p className="text-zinc-600 dark:text-zinc-300">Проверка роли пользователя...</p>
      </section>
    );
  }

  if (!isAuthor) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Создание шаблона</h1>
        <p className="text-zinc-700 dark:text-zinc-300">Гостевой режим: создание шаблонов недоступно.</p>
        <Link href="/catalog" className="underline">
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Создание шаблона</h1>
      <PromptForm mode="create" />
      <div className="flex gap-3 text-sm">
        <Link href="/profile/my-templates" className="underline">
          В мои шаблоны
        </Link>
        <Link href="/catalog" className="underline">
          Назад в каталог
        </Link>
      </div>
    </section>
  );
}
