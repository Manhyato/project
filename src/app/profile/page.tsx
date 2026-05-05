"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-store";

export default function ProfilePage() {
  const { user, role } = useAuth();

  return (
    <section className="space-y-4 rounded border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <h1 className="text-2xl font-semibold">Профиль пользователя</h1>
      <p>
        <strong>Имя:</strong> {user.name}
      </p>
      <p>
        <strong>Роль:</strong> {role === "author" ? "Автор" : "Гость"}
      </p>
      <div className="flex gap-4 text-sm">
        <Link className="text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white" href="/profile/my-templates">
          Мои шаблоны
        </Link>
        <Link className="text-zinc-700 transition hover:text-black hover:underline dark:text-zinc-300 dark:hover:text-white" href="/profile/favorites">
          Избранное
        </Link>
      </div>
    </section>
  );
}
