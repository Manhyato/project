import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function KnowledgePage() {
  const articles = [
    {
      title: "Основы написания промптов",
      body: "Используйте роль, контекст, ограничения и ожидаемый формат ответа.",
    },
    {
      title: "Частые ошибки",
      body: "Слишком общий запрос, отсутствие критериев качества и неявная структура результата.",
    },
    {
      title: "Примеры хороших шаблонов",
      body: "Промпты для маркетинга, анализа и разработки с четкой задачей и выходным форматом.",
    },
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">База знаний</h1>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li
            key={article.title}
            className="rounded border border-zinc-300 bg-white p-4 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
          >
            <h2 className="font-medium">{article.title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{article.body}</p>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm">
        <Link href="/research" className={buttonVariants("secondary")}>
          Перейти к исследованиям
        </Link>
        <Link href="/catalog" className={buttonVariants("secondary")}>
          Перейти в каталог
        </Link>
      </div>
    </section>
  );
}
