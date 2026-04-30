import Link from "next/link";
import { SearchBox } from "@/components/search-box";

export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Библиотека промптов для LLM</h1>
      <p className="max-w-2xl text-zinc-700">
        Создавайте, храните и переиспользуйте промпты. Начните с поиска или перейдите к каталогу.
      </p>
      <SearchBox />
      <div className="flex gap-3">
        <Link
          href="/catalog"
          aria-label="Перейти в каталог промптов"
          className="rounded-lg bg-zinc-300 px-4 py-2 text-white transition hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:bg-black"
        >
          Перейти в каталог
        </Link>
        <Link
          href="/create"
          aria-label="Открыть страницу создания шаблона"
          className="rounded border border-zinc-300 bg-white px-4 py-2 text-zinc-900 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 active:bg-zinc-200"
        >
          Создать шаблон
        </Link>
      </div>
    </section>
  );
}
