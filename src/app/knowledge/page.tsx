import Link from "next/link";

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
          <li key={article.title} className="rounded border bg-white p-4">
            <h2 className="font-medium">{article.title}</h2>
            <p className="text-sm text-zinc-600">{article.body}</p>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm">
        <Link href="/research" className="underline">
          Перейти к исследованиям
        </Link>
        <Link href="/catalog" className="underline">
          Перейти в каталог
        </Link>
      </div>
    </section>
  );
}
