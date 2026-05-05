import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function ResearchPage() {
  const studies = [
    {
      title: "Кейс: поддержка клиентов",
      body: "Промпт-сценарии сократили время ответа на 27% при сохранении точности.",
    },
    {
      title: "Пример использования в разработке",
      body: "Шаблоны для code review и генерации тест-кейсов повысили покрытие регрессий.",
    },
    {
      title: "Сравнительный анализ",
      body: "Лучшие результаты дают промпты с явными правилами, примерами ввода и структурой вывода.",
    },
  ];

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Исследования</h1>
      <ul className="space-y-3">
        {studies.map((study) => (
          <li
            key={study.title}
            className="rounded border border-zinc-300 bg-white p-4 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-500"
          >
            <h2 className="font-medium">{study.title}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{study.body}</p>
          </li>
        ))}
      </ul>
      <div className="flex gap-3 text-sm">
        <Link href="/knowledge" className={buttonVariants("secondary")}>
          Вернуться в базу знаний
        </Link>
        <Link href="/catalog" className={buttonVariants("secondary")}>
          Перейти в каталог
        </Link>
      </div>
    </section>
  );
}
