import Link from "next/link";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[220px_1fr]">
      <aside className="rounded border bg-white p-4">
        <h2 className="mb-2 font-semibold">Профиль</h2>
        <nav className="space-y-2 text-sm">
          <Link href="/profile" className="block underline">
            Обзор профиля
          </Link>
          <Link href="/profile/my-templates" className="block underline">
            Мои шаблоны
          </Link>
          <Link href="/profile/favorites" className="block underline">
            Избранное
          </Link>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
