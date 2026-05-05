import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { ButtonLink, buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Библиотека промптов для LLM</h1>
      <p className="max-w-2xl text-zinc-700 dark:text-zinc-300">
        Создавайте, храните и переиспользуйте промпты. Начните с поиска или перейдите к каталогу.
      </p>
      <SearchBox />
      <div className="flex gap-3">
        <ButtonLink href="/catalog" aria-label="Перейти в каталог промптов" variant="primary">
          Перейти в каталог
        </ButtonLink>
        <Link
          href="/create"
          aria-label="Открыть страницу создания шаблона"
          className={buttonVariants("secondary")}
        >
          Создать шаблон
        </Link>
      </div>
    </section>
  );
}
