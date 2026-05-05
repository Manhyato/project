import Link from "next/link";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <aside className="rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="mb-2 font-semibold">Профиль</h2>
        <nav className="space-y-2 text-sm">
          <Link
            href="/profile"
            className="block text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
          >
            Обзор профиля
          </Link>
          <Link
            href="/profile/my-templates"
            className="block text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
          >
            Мои шаблоны
          </Link>
          <Link
            href="/profile/favorites"
            className="block text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white"
          >
            Избранное
          </Link>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
