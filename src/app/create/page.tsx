import Link from "next/link";
import { PromptForm } from "@/components/prompt-form";
import { canCreate } from "@/lib/auth";

export default function CreatePage() {
  if (!canCreate()) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Создание шаблона</h1>
        <p>Гостевой режим: создание шаблонов недоступно.</p>
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
