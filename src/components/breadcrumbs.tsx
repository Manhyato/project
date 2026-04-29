"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const dictionary: Record<string, string> = {
  catalog: "Каталог",
  create: "Создание",
  search: "Поиск",
  knowledge: "База знаний",
  research: "Исследования",
  profile: "Профиль",
  "my-templates": "Мои шаблоны",
  favorites: "Избранное",
  edit: "Редактирование",
  prompts: "Промпты",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumbs" className="text-sm text-zinc-500">
      <ol className="flex flex-wrap gap-2">
        <li>
          <Link href="/" className="hover:underline">
            Главная
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = dictionary[segment] ?? segment;
          const last = index === segments.length - 1;
          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>
              {last ? <span>{label}</span> : <Link href={href}>{label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
